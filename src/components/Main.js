import React, { useState } from "react";

import LoginView from "./LoginView";

const Main = ({ users }) => {
  const [displaying, setDisplaying] = useState("login");
  switch (displaying) {
    case "login":
      return <LoginView users={users} />;
    default:
      return <h1>Error!</h1>;
  }
};

export default Main;
