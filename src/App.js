import React, { useState, useEffect } from "react";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import UpperBar from "./components/UpperBar";

const App = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = () => {
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(
      "https://vvuelosrestfulservices.azurewebsites.net/api/Usuarios",
      config
    )
      .then((res) => setUsers(res["data"]))
      .catch((err) => console.log(err));
    //.then((rej) => console.log(rej));
  };
  return (
    <>
      {users !== null ? (
        <Container>
          <UpperBar />
        </Container>
      ) : (
        <h1>Cargando data...</h1>
      )}
    </>
  );
};

export default App;
