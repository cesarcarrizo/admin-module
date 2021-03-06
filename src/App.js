import React, { useState, useEffect } from "react";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import UpperBar from "./components/UpperBar";
import Main from "./components/Main";
import { write } from "./store/StorageHandler";

const App = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    getAllUsers();
    // write("rPaises", 0);
    // write("rAerolineas", 0);
    // write("rPuertas", 0);
    // write("rVuelosSalidas", 0);
    // write("rVuelosLlegadas", 0);
    // write("rBoletos", 0);
  }, []);
  const getAllUsers = () => {
    const config = {
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
          <Main users={users} />
        </Container>
      ) : (
        <Container>
          <br></br>
          <Spinner animation="border">
            <span className="sr-only">Loading data...</span>
          </Spinner>
        </Container>
      )}
    </>
  );
};

export default App;
