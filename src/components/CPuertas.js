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
    Axios.get(uri, config)
      .then((res) => setPuertas(res["data"]))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {puertas !== null ? (
        <Alert>
          <strong>Puertas</strong>
          <br></br>
          <Table striped bordered hover variant="light">
            <thead>
              <th>Consecutivo</th>
              <th>Número de puerta</th>
              <th>Estado</th>
            </thead>
            <tbody>
              {puertas.map((p) => {
                return (
                  <tr key={p["id"]}>
                    <td>{p["id"]}</td>
                    <td>{p["numero"]}</td>
                    <td>{p["estado"] === 0 ? "Cerrada" : "Abierta"}</td>
                  </tr>
                );
              })}
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
