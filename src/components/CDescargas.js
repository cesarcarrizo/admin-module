import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";

const CDescargas = () => {
  const [descargas, setDescargas] = useState(null);

  useEffect(() => {
    const uri =
      "https://vvuelosrestfulservices.azurewebsites.net/api/VuelosLlegadas";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(uri)
      .then((res) => setDescargas(res["data"]))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {descargas !== null ? (
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

export default CDescargas;
