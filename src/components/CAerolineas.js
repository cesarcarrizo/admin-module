import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";

const CAerolineas = () => {
  const [aerolineas, setAerolineas] = useState(null);

  useEffect(() => {
    const uri =
      "https://vvuelosrestfulservices.azurewebsites.net/api/Aerolineas";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(uri, config)
      .then((res) => setAerolineas(res["data"]))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {aerolineas !== null ? (
        <Alert>
          <strong>Aerolíneas</strong>
          <br></br>
          <Table striped bordered hover variant="dark">
            <thead>
              <th>Consecutivo</th>
              <th>Nombre de la aerolínea</th>
            </thead>
            <tbody>
              {aerolineas.map((a) => {
                return (
                  <tr key={a["id"]}>
                    <td>{a["id"]}</td>
                    <td>{a["nombre"]}</td>
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

export default CAerolineas;
