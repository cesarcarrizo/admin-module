import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Spinner, Table } from "react-bootstrap";

import NewAerolinea from "./NewAerolinea";
import EditAerolinea from "./EditAerolinea";

const Aerolineas = () => {
  const [aerolineas, setAerolineas] = useState(null);
  const [rendering, setRendering] = useState("lista-aero");

  useEffect(() => {
    const uri =
      "https://vvuelosrestfulservices.azurewebsites.net/api/Aerolineas";
    Axios.get(uri).then((res) => setAerolineas(res["data"]));
  }, []);

  return (
    <>
      {aerolineas !== null ? (
        <>
          {rendering === "lista-aero" ? (
            <Alert variant="secondary">
              <strong>Aerolíneas</strong>
              <br></br>
              <br></br>
              <Table striped bordered hover variant="dark">
                <thead>
                  <th>ID</th>
                  <th>Nombre</th>
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
              <br></br>
              <Alert.Link onClick={() => setRendering("nuevo-aero")}>
                <small>Añadir nueva aerolínea</small>
              </Alert.Link>
              <hr></hr>
              <Alert.Link onClick={() => setRendering("editar-aero")}>
                <small>Editar nombre de una aerolínea</small>
              </Alert.Link>
            </Alert>
          ) : (
            <></>
          )}

          {rendering === "nuevo-aero" ? (
            <NewAerolinea rendersetter={setRendering} />
          ) : (
            <></>
          )}
          {rendering === "editar-aero" ? (
            <EditAerolinea rendersetter={setRendering} />
          ) : (
            <></>
          )}
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default Aerolineas;
