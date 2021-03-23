import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";

const CPuertas = () => {
  const [puertas, setPuertas] = useState(null);

  useEffect(() => {
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Puertas";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(uri)
      .then((res) => setPuertas(res["data"]))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {puertas !== null ? (
        <Alert>
          <br></br>
          <strong>the shieet</strong>
          <br></br>
          <Table striped bordered hover variant="dark">
            <thead>
              <th>bitz</th>
            </thead>
            <tbody>
              {
                // map the shieet boi
              }
            </tbody>
          </Table>
        </Alert>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default CPuertas;
