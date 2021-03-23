import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";

const CBitacora = () => {
  const [bitacoras, setBitacoras] = useState(null);

  useEffect(() => {
    const uri =
      "https://vvuelosrestfulservices.azurewebsites.net/api/Bitacoras";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(uri)
      .then((res) => setBitacoras(res["data"]))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {bitacoras !== null ? (
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

export default CBitacora;
