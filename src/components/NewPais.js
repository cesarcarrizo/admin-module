import Axios from "axios";
import React, { useState } from "react";
import { Alert, Col, Form, Row, Button, Spinner } from "react-bootstrap";

import { read, goNext, trim, getConsecutivos } from "../store/StorageHandler";
import PostedAlert from "./PostedAlert";

const NewPais = ({ rendersetter }) => {
  const [name, setName] = useState("");
  const [requested, setRequested] = useState(false);
  const [posted, setPosted] = useState(false);
  const [idPosted, setIdPosted] = useState(null);

  const handler = async () => {
    if (validaciones()) {
      setRequested(true);
      let toPost = {
        id: await generarId(),
        nombre: name,
      };
      const config = {
        headers: {
          "Allow-Control-Allow-Origin": "*",
        },
      };

      const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Paises";

      Axios.post(uri, toPost, config)
        .then((res) => {
          setPosted(true);
          setIdPosted(toPost["id"]);
        })
        .catch((err) => console.log(err));
    }
  };

  const validaciones = () => {
    if (name === "" || !isNaN(name)) {
      alert("Ingrese un nombre de país válido!");
      return false;
    }
    return true;
  };

  const generarId = async () => {
    let consecutivos = await getConsecutivos();
    //console.log(consecutivos);
    goNext("paises");
    return trim(consecutivos[0], read("rPaises"));
  };

  return (
    <>
      {!posted ? (
        <>
          {!requested ? (
            <Alert variant="secondary">
              <Alert.Link onClick={() => rendersetter("lista-paises")}>
                <small>Atrás</small>
              </Alert.Link>
              <br></br>
              <strong>Agregar Nuevo País</strong>
              <br></br>
              <br></br>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Escriba el nombre del país nuevo a agregar."
                    onChange={(e) => setName(e["target"]["value"])}
                  ></Form.Control>
                </Col>
                <Col>
                  <Button variant="success" block onClick={handler}>
                    Agregar nuevo país
                  </Button>
                </Col>
              </Row>
            </Alert>
          ) : (
            <Spinner animation="border"></Spinner>
          )}
        </>
      ) : (
        <PostedAlert
          header="País agregado satisfactoriamente!"
          content={`Id: ${idPosted} - Pais agregado: ${name}`}
        />
      )}
    </>
  );
};

export default NewPais;
