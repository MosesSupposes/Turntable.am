// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as MusicPlayer$Turntableam from "./MusicPlayer.bs.js";
import SpotifyWebPlaybackSDKJs from "../services/SpotifyWebPlaybackSDK.js";

function startPlayer(prim) {
  SpotifyWebPlaybackSDKJs(prim);
  
}

function shouldShowWelcomeMessageAndAppDescription(accessToken) {
  return accessToken === undefined;
}

function renderWelcomeMessage(param) {
  return React.createElement("h1", undefined, "Welcome to Turntable.AM");
}

function renderAppDescription(param) {
  return React.createElement("p", undefined, "Turntable.AM is a music sharing app that allows you to collaboratively create custom playlists with your friends. Click the Sign In link above to connect your Spotify account to the app.");
}

function Home(Props) {
  var setPage = Props.setPage;
  var accessToken = Props.accessToken;
  React.useEffect((function () {
          if (accessToken !== undefined) {
            SpotifyWebPlaybackSDKJs(accessToken);
          }
          
        }), [accessToken]);
  return React.createElement("div", undefined, shouldShowWelcomeMessageAndAppDescription(accessToken) ? React.createElement("div", undefined, renderWelcomeMessage(undefined), renderAppDescription(undefined)) : React.createElement(MusicPlayer$Turntableam.make, {
                    setPage: setPage
                  }));
}

var make = Home;

export {
  startPlayer ,
  shouldShowWelcomeMessageAndAppDescription ,
  renderWelcomeMessage ,
  renderAppDescription ,
  make ,
  
}
/* react Not a pure module */
