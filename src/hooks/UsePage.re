module Page = {
  type t =
    | Home
    | UserProfile
    | Login;
};

type export = {
  page: Page.t,
  setPage: (Page.t => Page.t) => unit,
};

let make = (): export => {
  let (page, setPage) = React.useState(() => Page.Home);
  {page, setPage};
};
