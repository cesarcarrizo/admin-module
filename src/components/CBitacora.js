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
    Axios.get(uri, config)
      .then((res) => setBitacoras(res["data"]))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {bitacoras !== null ? (
        <Alert>
          <br></br>
          <strong>Bitácora</strong>
          <br></br>
          <Table striped bordered hover variant="dark">
            <thead>
              <th>Usuario</th>
              <th>Fecha y Hora</th>
              <th>Tipo de Consulta realizada</th>
              <th>Detalle</th>
            </thead>
            <tbody>
              {bitacoras.map((b) => {
                return (
                  <tr key={b["id"]}>
                    <td>{b["usuario"]}</td>
                    <td>{b["fechahora"]}</td>
                    <td>{b["tipoconsulta"]}</td>
                    <td>{b["detalle"]}</td>
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

export default CBitacora;
