[@bs.val] external window: Js.t({..}) = "window";
[@bs.val] external setTimeout: (unit => unit, int) => unit = "setTimeout";

[%bs.raw {|require("../styles/musicPlayer.css")|}];

open UsePage;

type spotifyPlayer('a) = Js.t({..} as 'a);

type musicPlayerState('a) = {
  currentTrack: string,
  currentArtist: string,
  currentAlbum: string,
  nextSong: string,
  nextArtist: string,
  deviceId: option(string),
  spotifyPlayer: option(spotifyPlayer({..} as 'a)),
  trackInfo: option(Decoders.MusicPlayer.trackInfo),
};

// Helper functions
module Helpers = {
  let getCurrentTrack = (trackInfo: Decoders.MusicPlayer.trackInfo): string => {
    trackInfo.track_window.current_track.name;
  };
  let getArtistOrUnknown =
      (artists: list(Decoders.MusicPlayer.artist)): string => {
    switch (artists) {
    | [] => "Unknown"
    | [artist] => artist.name
    | [firstArtist, ...otherArtists] => firstArtist.name
    };
  };

  let getCurrentArtist = (trackInfo: Decoders.MusicPlayer.trackInfo) => {
    trackInfo.track_window.current_track.artists |> getArtistOrUnknown;
  };

  let getCurrentAlbum = (trackInfo: Decoders.MusicPlayer.trackInfo): string => {
    trackInfo.track_window.current_track.album.name;
  };

  let getNextSong = (trackInfo: Decoders.MusicPlayer.trackInfo): string => {
    trackInfo.track_window.next_tracks |> List.hd |> (x => x.name);
  };

  let getNextArtist = (trackInfo: Decoders.MusicPlayer.trackInfo): string => {
    trackInfo.track_window.next_tracks
    |> List.hd
    |> (x => x.artists)
    |> getArtistOrUnknown;
  };

  let getAlbumCoverUrl = (images: list(Decoders.MusicPlayer.image)): string => {
    switch (images) {
    | [] => ""
    | [smallImg, mediumImg, largeImg, ...restImgs] => largeImg.url
    | [smallImg, mediumImg, ...restImgs] => mediumImg.url
    | [smallImg, ...restImgs] => smallImg.url
    };
  };
};

let createEventHandlers =
    (
      player: spotifyPlayer({..}),
      setPage: (Page.t => Page.t) => unit,
      setMusicPlayer:
        (musicPlayerState({..}) => musicPlayerState({..})) => unit,
    )
    : unit => {
  // The "ready" event is handled from the JS side (see src/services/SpotifyWebPlaybackSDK.js)
  let () = player##on("initialization_error", e => Js.log(e));
  let () = player##on("authentication_error", e => setPage(_ => Page.Login));
  let () = player##on("account_error", e => Js.log(e));
  let () = player##on("playback_error", e => Js.log(e));
  let () =
    player##on("player_state_changed", state => {
      let decodedTrackInfo = Decoders.MusicPlayer.decodeTrackInfo(state);
      setMusicPlayer(prevState =>
        {
          ...prevState,
          trackInfo: Some(decodedTrackInfo),
          currentTrack: Helpers.getCurrentTrack(decodedTrackInfo),
          currentArtist: Helpers.getCurrentArtist(decodedTrackInfo),
          currentAlbum: Helpers.getCurrentAlbum(decodedTrackInfo),
          nextSong: Helpers.getNextSong(decodedTrackInfo),
          nextArtist: Helpers.getNextArtist(decodedTrackInfo),
        }
      );
    });
  ();
};

let renderLoadingScreen = () => <p> {React.string("Loading...")} </p>;

let renderConnectionInstructions = () =>
  <p>
    {React.string(
       "To interact with the Music Player, navigate to Spotify from your web browser and click the \"Connect to a device\" button. Then, select \"Turntable.AM\" from the menu.",
     )}
  </p>;

// TODO: Finish the tutorial to figure out how to enable automatic playback
// TODO: Add player controls (ex: pause, skip track, etc.)
[@react.component]
let make = (~setPage: (Page.t => Page.t) => unit) => {
  let (musicPlayer: musicPlayerState({..}), setMusicPlayer) =
    React.useState(() =>
      {
        currentTrack: "",
        currentArtist: "",
        currentAlbum: "",
        nextSong: "",
        nextArtist: "",
        deviceId: None,
        spotifyPlayer: None,
        trackInfo: None,
      }
    );

  let {
    currentTrack,
    currentArtist,
    currentAlbum,
    nextSong,
    nextArtist,
    deviceId,
    spotifyPlayer,
    trackInfo,
  } = musicPlayer;

  // Store the Spotify player object in state once it loads
  let () =
    React.useEffect0(() => {
      let () =
        setTimeout(
          () => {
            setMusicPlayer(prevState =>
              {
                ...prevState,
                spotifyPlayer: Some(window##player),
                deviceId: Some(window##deviceId),
              }
            )
          },
          1000,
        );
      None;
    });

  React.useEffect1(
    () => {
      switch (spotifyPlayer) {
      | Some(player) => createEventHandlers(player, setPage, setMusicPlayer)
      | None => ()
      };
      None;
    },
    [|spotifyPlayer|],
  );

  switch (spotifyPlayer) {
  | Some(player) =>
    switch (trackInfo) {
    | Some(info) =>
      let {track_window: {current_track: {album: {images: albumCovers}}}}: Decoders.MusicPlayer.trackInfo = info;
      let albumCoverUrl = albumCovers |> Helpers.getAlbumCoverUrl;
      <div>
        <h2> {React.string("Now Playing:")} </h2>
        <p> {React.string({j|Track: $currentTrack |j})} </p>
        <p> {React.string({j|Artist: $currentArtist|j})} </p>
        <p> {React.string({j|Album: $currentAlbum|j})} </p>
        <p> {React.string({j|Up Next: $nextSong by $nextArtist|j})} </p>
        <img className="album-cover" src=albumCoverUrl />
      </div>;
    | None => renderConnectionInstructions()
    }
  | None => renderLoadingScreen()
  };
};
