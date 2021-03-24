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
    Axios.get(uri, config)
      .then((res) => setDescargas(res["data"]))
      .catch((err) => alert(err));
  }, []);

  return (
    <>
      {descargas !== null ? (
        <Alert>
          <strong>Descargas</strong>
          <br></br>
          <Table striped bordered hover variant="light">
            <thead>
              <th>Consecutivos</th>
              <th>Aerolínea</th>
              <th>Procedencia</th>
              <th>Fecha</th>
              <th>ETA</th>
              <th>Estado del vuelo</th>
              <th>Puerta</th>
            </thead>
            <tbody>
              {descargas.map((d) => {
                return (
                  <tr key={d["id"]}>
                    <td>{d["id"]}</td>
                    <td>{d["aerolinea"]}</td>
                    <td>{d["procedencia"]}</td>
                    <td>{d["fecha"]}</td>
                    <td>{d["hora"]}</td>
                    <td>{d["estado"]}</td>
                    <td>{d["puerta"]}</td>
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

export default CDescargas;
