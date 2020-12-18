// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Uuid from "uuid";
import * as ReCrypt from "@space-labs/re-crypt/src/ReCrypt.bs.js";

var authorizationBaseURI = "https://accounts.spotify.com/authorize";

var clientId = "96e25e1a56b5467fbbf82af545444904";

var localhostEncoded = "https://kind-fermat-94e8ea.netlify.app/";

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
  "user-read-private"
];

function urlEncode(arr) {
  return arr.join("%2C");
}

function generateCodeVerifier(param) {
  return Uuid.v4() + Uuid.v4();
}

function generateCodeChallenge(param) {
  return btoa(ReCrypt.Sha256.make(generateCodeVerifier(undefined)));
}

var scopesEncoded = scopes.join("%2C");

var state = Uuid.v4();

var codeChallenge = generateCodeChallenge(undefined);

var authorizationURI = "" + authorizationBaseURI + "?response_type=code&client_id=" + clientId + "&redirect_uri=" + localhostEncoded + "&scope=" + scopesEncoded + "&state=" + state + "&code_challenge=" + codeChallenge + "&code_challenge_method=S256";

function signIn(param) {
  return fetch(authorizationURI).then(function (res) {
              return Promise.resolve((console.log(res), undefined));
            });
}

var AuthorizationPKCE = {
  corsAnywhereUrl: "https://cors-anywhere.herokuapp.com/",
  authorizationBaseURI: authorizationBaseURI,
  clientId: clientId,
  localhostEncoded: localhostEncoded,
  scopes: scopes,
  urlEncode: urlEncode,
  generateCodeVerifier: generateCodeVerifier,
  generateCodeChallenge: generateCodeChallenge,
  scopesEncoded: scopesEncoded,
  state: state,
  codeChallenge: codeChallenge,
  authorizationURI: authorizationURI,
  signIn: signIn
};

var authorizationBaseURI$1 = "https://accounts.spotify.com/authorize";

var clientId$1 = "96e25e1a56b5467fbbf82af545444904";

var localhostEncoded$1 = "http%3A%2F%2Flocalhost%3A1234";

var scopes$1 = [
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
  "user-read-private"
];

function urlEncode$1(arr) {
  return arr.join("%2C");
}

var state$1 = Uuid.v4();

var scopesEncoded$1 = scopes$1.join("%2C");

var finalEncodedUri = "" + authorizationBaseURI$1 + "?client_id=" + clientId$1 + "&response_type=\"token\"&redirect_uri=" + localhostEncoded$1 + "&state=" + state$1 + "&scope=" + scopesEncoded$1;

function signIn$1(param) {
  return fetch(finalEncodedUri).then(function (response) {
              return Promise.resolve((console.log(response), undefined));
            });
}

var AuthorizationImplicitGrant = {
  authorizationBaseURI: authorizationBaseURI$1,
  clientId: clientId$1,
  corsAnywhereUrl: "https://cors-anywhere.herokuapp.com/",
  localhostEncoded: localhostEncoded$1,
  scopes: scopes$1,
  urlEncode: urlEncode$1,
  state: state$1,
  scopesEncoded: scopesEncoded$1,
  finalEncodedUri: finalEncodedUri,
  signIn: signIn$1
};

function signIn$2(param) {
  return fetch("http://localhost:9000/login").then(function (response) {
              return Promise.resolve((console.log(response), undefined));
            });
}

var AuthorizationClientCredentials = {
  signIn: signIn$2
};

var base = "https://api.spotify.com";

export {
  base ,
  AuthorizationPKCE ,
  AuthorizationImplicitGrant ,
  AuthorizationClientCredentials ,
  
}
/* scopesEncoded Not a pure module */
