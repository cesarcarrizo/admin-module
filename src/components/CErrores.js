import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";

const CErrores = () => {
  const [errores, setErrores] = useState(null);

  useEffect(() => {
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Errores";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(uri, config)
      .then((res) => setErrores(res["data"]))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {errores !== null ? (
        <Alert>
          <strong>Errores</strong>
          <br></br>
          <Table striped bordered hover variant="dark">
            <thead>
              <th>Fecha y hora del error</th>
              <th>Tipo de error</th>
            </thead>
            <tbody>
              {errores.map((e) => {
                return (
                  <tr key={e["id"]}>
                    <td>{e["fechahora"]}</td>
                    <td>{e["tipo"]}</td>
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

export default CErrores;
