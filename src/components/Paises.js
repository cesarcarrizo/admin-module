import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";

import NewPais from "./NewPais";
import EditPais from "./EditPais";

const Paises = () => {
  const [paises, setPaises] = useState(null);
  const [rendering, setRendering] = useState("lista-paises");

  useEffect(() => {
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Paises";
    Axios.get(uri).then((res) => setPaises(res["data"]));
  }, []);
  return (
    <>
      {paises === null ? (
        <Spinner animation="border" />
      ) : (
        <>
          {rendering === "lista-paises" ? (
            <Alert variant="secondary">
              <strong>Países</strong>
              <br></br>
              <br></br>
              <Table striped bordered hover variant="dark">
                <thead>
                  <th>ID</th>
                  <th>Nombre</th>
                </thead>
                <tbody>
                  {paises.map((p) => {
                    return (
                      <tr key={p["id"]}>
                        <td>{p["id"]}</td>
                        <td>{p["nombre"]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <br></br>
              <Alert.Link onClick={() => setRendering("nuevo-pais")}>
                <small>Añadir nuevo país</small>
              </Alert.Link>
              <hr></hr>
              <Alert.Link onClick={() => setRendering("editar-pais")}>
                <small>Editar nombre de país</small>
              </Alert.Link>
            </Alert>
          ) : (
            <></>
          )}
          {rendering === "nuevo-pais" ? (
            <NewPais rendersetter={setRendering} />
          ) : (
            <></>
          )}
          {rendering === "editar-pais" ? (
            <EditPais rendersetter={setRendering} />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default Paises;
