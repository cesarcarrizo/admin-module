import React, { useState } from "react";

import LoginView from "./LoginView";
import AppView from "./AppView";

const Main = ({ users }) => {
  const [displaying, setDisplaying] = useState("login");
  const [guest, setGuest] = useState(null);
  switch (displaying) {
    case "app":
      return <AppView guest={guest} displaysetter={setDisplaying} />;
    case "login":
      return (
        <LoginView
          users={users}
          displaysetter={setDisplaying}
          guestsetter={setGuest}
        />
      );
    default:
      return <h1>Error!</h1>;
  }
};

export default Main;
