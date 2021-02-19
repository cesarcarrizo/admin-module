import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../imgs/key.svg";

const UpperBar = () => {
  return (
    <Navbar bg="light">
      <Navbar.Brand>
        <img
          src={logo}
          width="30"
          heigth="30"
          className="d-inline-block align-top"
          alt="V-Vuelos Staff"
        />
        V-Vuelos Staff
      </Navbar.Brand>
    </Navbar>
  );
};

export default UpperBar;
