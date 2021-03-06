// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Uuid from "uuid";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Ajax$Turntableam from "./Ajax.bs.js";

var authorizationBaseURI = "https://accounts.spotify.com/authorize";

var clientId = "96e25e1a56b5467fbbf82af545444904";

var localhostUnencoded = "http://localhost:1234";

var scopes = [
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-recently-played",
  "user-top-read",
  "ugc-image-upload",
  "user-follow-read",
  "user-library-read",
  "user-library-modify",
  "user-read-email",
  "user-read-private",
  "streaming"
];

function urlEncode(arr) {
  return arr.join("%2C");
}

var state = Uuid.v4();

var scopesEncoded = scopes.join("%2C");

var finalEncodedUri = "" + authorizationBaseURI + "?client_id=" + clientId + "&response_type=token&redirect_uri=" + localhostUnencoded + "&state=" + state + "&scope=" + scopesEncoded;

var Authorization = {
  authorizationBaseURI: authorizationBaseURI,
  clientId: clientId,
  localhostUnencoded: localhostUnencoded,
  scopes: scopes,
  urlEncode: urlEncode,
  state: state,
  scopesEncoded: scopesEncoded,
  finalEncodedUri: finalEncodedUri
};

function searchArtist(accessToken, artist, onSuccess, onFail) {
  return Ajax$Turntableam.getRequest("https://api.spotify.com/v1/search?q=" + artist + "&type=artist", accessToken, onSuccess, onFail);
}

function searchTrack(accessToken, track, onSuccess, onFail) {
  return Ajax$Turntableam.getRequest("https://api.spotify.com/v1/search?q=" + track + "&type=track", accessToken, onSuccess, onFail);
}

var Search = {
  searchArtist: searchArtist,
  searchTrack: searchTrack
};

function getCurrentUsersProfile(accessToken) {
  return Ajax$Turntableam.getRequest("https://api.spotify.com/v1/me", accessToken, (function (p) {
                return p;
              }), (function (err) {
                console.log(err);
                return Promise.resolve(err);
              }));
}

var Profile = {
  getCurrentUsersProfile: getCurrentUsersProfile
};

function create(config, accessToken, profile) {
  return Ajax$Turntableam.postRequest("|https://api.spotify.com/v1/users/" + profile.id + "/playlists", {
              name: config.name,
              public: config.public,
              collaborative: config.collaborative,
              description: Belt_Option.getWithDefault(config.description, "")
            }, accessToken, (function (p) {
                return p;
              }), (function (err) {
                console.log(err);
                return Promise.resolve(err);
              }));
}

var Playlist = {
  create: create
};

var base = "https://api.spotify.com";

export {
  base ,
  Authorization ,
  Search ,
  Profile ,
  Playlist ,
  
}
/* state Not a pure module */
