// Generated by ReScript, PLEASE EDIT WITH CARE

import * as React from "react";
import * as Home$Turntableam from "./Home.bs.js";
import * as Login$Turntableam from "./Login.bs.js";
import * as UserProfile$Turntableam from "./UserProfile.bs.js";

function ApplicationContainer(Props) {
  var page = Props.page;
  var setPage = Props.setPage;
  var accessToken = Props.accessToken;
  switch (page) {
    case /* Home */0 :
        return React.createElement(Home$Turntableam.make, {
                    setPage: setPage,
                    accessToken: accessToken
                  });
    case /* UserProfile */1 :
        return React.createElement(UserProfile$Turntableam.make, {
                    setPage: setPage
                  });
    case /* Login */2 :
        return React.createElement(Login$Turntableam.make, {});
    
  }
}

var make = ApplicationContainer;

export {
  make ,
  
}
/* react Not a pure module */
