// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Uuid from "uuid";

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
  "user-read-private"
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

var base = "https://api.spotify.com";

export {
  base ,
  Authorization ,
  
}
/* state Not a pure module */
