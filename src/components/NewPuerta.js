import React, { useState } from "react";
import axios from "axios";
import { Alert, Row, Col, Form, Button, Spinner } from "react-bootstrap";

import { read, goNext, trim, getConsecutivos } from "../store/StorageHandler";
import PostedAlert from "./PostedAlert";

const NewPuerta = ({ rendersetter }) => {
  const [name, setName] = useState("");
  const [estatus, setEstatus] = useState(null);
  const [requested, setRequested] = useState(false);
  const [posted, setPosted] = useState(false);
  const [idPosted, setIdPosted] = useState(null);

  const handler = async () => {
    if (validaciones()) {
      setRequested(true);
      let toPost = {
        id: await generarId(),
        numero: name,
        estado: estatus,
      };
      const config = {
        headers: {
          "Allow-Control-Allow-Origin": "*",
        },
      };

      const uri =
        "https://vvuelosrestfulservices.azurewebsites.net/api/Puertas";

      axios
        .post(uri, toPost, config)
        .then((res) => {
          setPosted(true);
          setIdPosted(toPost["id"]);
        })
        .catch((err) => console.log(err));
    }
  };

  const generarId = async () => {
    let consecutivos = await getConsecutivos();
    goNext("puertas");
    return trim(consecutivos[2], read("rPuertas"));
  };

  const validaciones = () => {
    if (name === "" || estatus === null) {
      alert("Todos los campos son obligatorios!");
      return false;
    }

    return true;
  };
  return (
    <>
      {!posted ? (
        <>
          {!requested ? (
            <Alert variant="secondary">
              <Alert.Link onClick={() => rendersetter("lista-puertas")}>
                <small>Atrás</small>
              </Alert.Link>
              <br></br>
              <strong>Agregar Nueva Puerta</strong>
              <br></br>
              <br></br>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Número/Nombre de la nueva puerta a agregar."
                    onChange={(e) => setName(e["target"]["value"])}
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Control as="select">
                    <option onClick={() => setEstatus(null)}>
                      Seleccione una opción...
                    </option>
                    <option onClick={() => setEstatus(1)}>Abierta</option>
                    <option onClick={() => setEstatus(0)}>Cerrada</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Button variant="success" block onClick={handler}>
                    Agregar nueva puerta
                  </Button>
                </Col>
              </Row>
            </Alert>
          ) : (
            <Spinner animation="border" />
          )}
        </>
      ) : (
        <PostedAlert
          header="Puerta agregada satisfactoriamente!"
          content={`Id: ${idPosted} - Puerta agregada: ${name}`}
        />
      )}
    </>
  );
};

export default NewPuerta;
