import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";
import NewPuerta from "./NewPuerta";
import EditPuerta from "./EditPuerta";

const Puertas = () => {
  const [puertas, setPuertas] = useState(null);
  const [rendering, setRendering] = useState("lista-puertas");

  useEffect(() => {
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Puertas";
    Axios.get(uri).then((res) => setPuertas(res["data"]));
  }, []);

  const str = (n) => {
    switch (n) {
      case 0:
        return "Cerrada";
      case 1:
        return "Abierta";
      default:
        return new Error("Param no configurado en str(n)!");
    }
  };

  return (
    <>
      {puertas !== null ? (
        <>
          {rendering === "lista-puertas" ? (
            <Alert variant="secondary">
              <strong>Puertas</strong>
              <br></br>
              <br></br>
              <Table striped bordered hover variant="dark">
                <thead>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estatus</th>
                </thead>
                <tbody>
                  {puertas.map((p) => {
                    return (
                      <tr key={p["id"]}>
                        <td>{p["id"]}</td>
                        <td>{p["numero"]}</td>
                        <td>{str(p["estado"])}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <br></br>
              <Alert.Link onClick={() => setRendering("new-puerta")}>
                <small>Añadir nueva puerta a la aerolínea</small>
              </Alert.Link>
              <hr></hr>
              <Alert.Link onClick={() => setRendering("edit-puertas")}>
                <small>Editar nombre de una puerta ya existente</small>
              </Alert.Link>
            </Alert>
          ) : (
            <></>
          )}
          {rendering === "new-puerta" ? (
            <NewPuerta rendersetter={setRendering} />
          ) : (
            <></>
          )}
          {rendering === "edit-puertas" ? (
            <EditPuerta rendersetter={setRendering} />
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

export default Puertas;
