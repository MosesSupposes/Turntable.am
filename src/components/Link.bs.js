// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as React from "react";

function Link(Props) {
  var to_ = Props.to_;
  var setPage = Props.setPage;
  var children = Props.children;
  return React.createElement("div", {
              onClick: (function (param) {
                  return Curry._1(setPage, (function (param) {
                                return to_;
                              }));
                })
            }, children);
}

var make = Link;

export {
  make ,
  
}
/* react Not a pure module */