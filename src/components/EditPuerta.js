import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Form, Spinner, Button } from "react-bootstrap";
import PostedAlert from "./PostedAlert";

const EditPuerta = ({ rendersetter }) => {
  const [puertas, setPuertas] = useState(null);
  const [id, setId] = useState(null);
  const [oldNumero, setOldNumero] = useState(null);
  const [oldEstado, setOldEstado] = useState(null);
  const [newNumero, setNewNumero] = useState("");
  const [newEstado, setNewEstado] = useState(null);
  const [requested, setRequested] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Puertas";
    Axios.get(uri)
      .then((res) => setPuertas(res["data"]))
      .catch((err) => alert(err));
  }, []);

  const configToEdit = (id, num, est) => {
    setId(id);
    setOldNumero(num);
    setOldEstado(est);
  };

  const handler = () => {
    if (validaciones()) {
      setRequested(true);
      const uri = `https://vvuelosrestfulservices.azurewebsites.net/api/Puertas/${id}`;
      const toUpdt = {
        id,
        numero: newNumero,
        estado: newEstado,
      };
      Axios.put(uri, toUpdt)
        .then((res) => setUpdated(true))
        .catch((err) => alert(err));
      //console.log("Validaciones pasadas");
    }
  };

  const validaciones = () => {
    if (newNumero === "" || newEstado === null || id === null) {
      alert("Todos los campos son obligatorios, favor llenarlos!");
      return false;
    }
    return true;
  };

  return (
    <>
      {!updated ? (
        <>
          {!requested ? (
            <>
              {puertas !== null ? (
                <Alert variant="secondary">
                  <Alert.Link onClick={() => rendersetter("lista-puertas")}>
                    <small>Atrás</small>
                  </Alert.Link>
                  <br></br>
                  <strong>Editar Puerta</strong>
                  <br></br>
                  <br></br>
                  <small>Seleccione la puerta a editar el número</small>
                  <Form.Control as="select">
                    <option
                      selected
                      onClick={() => configToEdit(null, null, null)}
                    >
                      Seleccione la puerta...
                    </option>
                    {puertas.map((p) => {
                      return (
                        <option
                          key={p["id"]}
                          onClick={() =>
                            configToEdit(p["id"], p["numero"], p["estado"])
                          }
                        >
                          {`Número actual: ${p["numero"]} - Estado actual: ${
                            p["estado"] === 0 ? "Cerrada" : "Abierta"
                          }`}
                        </option>
                      );
                    })}
                  </Form.Control>
                  <br></br>
                  <br></br>
                  {oldNumero !== null ? (
                    <>
                      <small>
                        Número a editar: <b>{oldNumero}</b>
                      </small>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  {oldEstado !== null ? (
                    <>
                      <small>
                        Estado a editar:{" "}
                        <b>{oldEstado === "0" ? "Cerrada" : "Abierta"}</b>
                      </small>
                      <br />
                    </>
                  ) : (
                    <></>
                  )}
                  <Form.Control
                    placeholder="Ingrese el nuevo número de puerta"
                    onChange={(e) => setNewNumero(e["target"]["value"])}
                  />
                  <br></br>
                  <small>Seleccione el estado de la puerta</small>
                  <Form.Control as="select">
                    <option selected onClick={() => setNewEstado(null)}>
                      Seleccione la el estado...
                    </option>
                    <option onClick={() => setNewEstado(1)}>Abierta</option>
                    <option onClick={() => setNewEstado(0)}>Cerrada</option>
                  </Form.Control>
                  <hr></hr>
                  <Button variant="info" block onClick={handler}>
                    Editar puerta
                  </Button>
                </Alert>
              ) : (
                <Spinner animation="border" />
              )}
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </>
      ) : (
        <PostedAlert
          header="Nombre de la puerta editado con éxito!"
          content={`${oldNumero} pasó a ser: ${newNumero} y ${
            oldEstado === "0" ? "Cerrada" : "Abierta"
          } pasó a estar ${newEstado === "0" ? "Cerrada" : "Abierta"}`}
        />
      )}
    </>
  );
};

export default EditPuerta;
