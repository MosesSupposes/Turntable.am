// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as UsePage$Turntableam from "./hooks/UsePage.bs.js";
import * as ApplicationContainer$Turntableam from "./components/ApplicationContainer.bs.js";

function App$app(Props) {
  var match = UsePage$Turntableam.make(undefined);
  return React.createElement(ApplicationContainer$Turntableam.make, {
              page: match.page,
              setPage: match.setPage
            });
}

var app = App$app;

export {
  app ,
  
}
/* react Not a pure module */
