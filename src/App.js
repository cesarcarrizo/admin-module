import React, { useState, useEffect } from "react";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import UpperBar from "./components/UpperBar";
import Main from "./components/Main";

const App = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    getAllUsers();
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
