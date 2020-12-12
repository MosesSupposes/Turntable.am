// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Footer$Turntableam from "./Footer.bs.js";
import * as Header$Turntableam from "./Header.bs.js";
import * as UsePage$Turntableam from "../hooks/UsePage.bs.js";
import * as ApplicationContainer$Turntableam from "./ApplicationContainer.bs.js";

function App(Props) {
  var match = UsePage$Turntableam.make(undefined);
  var setPage = match.setPage;
  return React.createElement("main", undefined, React.createElement(Header$Turntableam.make, {
                  setPage: setPage
                }), React.createElement(ApplicationContainer$Turntableam.make, {
                  page: match.page,
                  setPage: setPage
                }), React.createElement(Footer$Turntableam.make, {}));
}

var make = App;

export {
  make ,
  
}
/* react Not a pure module */
