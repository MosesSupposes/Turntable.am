open UsePage;

[@react.component]
let make = (~setPage: (Page.t => Page.t) => unit) => {
  <div> <h1> {React.string("Welcome to Turntable.Am")} </h1> </div>;
};
