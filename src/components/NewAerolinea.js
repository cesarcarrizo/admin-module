import Axios from "axios";
import React, { useState } from "react";
import { Alert, Col, Form, Row, Button, Spinner } from "react-bootstrap";

import { read, goNext, trim, getConsecutivos } from "../store/StorageHandler";
import PostedAlert from "./PostedAlert";

const NewAerolinea = ({ rendersetter }) => {
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

      //console.log(toPost);

      const uri =
        "https://vvuelosrestfulservices.azurewebsites.net/api/Aerolineas";

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
      alert("Ingrese un nombre de aerolínea válido!");
      return false;
    }
    return true;
  };

  const generarId = async () => {
    let consecutivos = await getConsecutivos();
    //console.log(consecutivos);
    goNext("aerolineas");
    return trim(consecutivos[1], read("rAerolineas"));
  };

  return (
    <>
      {!posted ? (
        <>
          {!requested ? (
            <Alert variant="secondary">
              <Alert.Link onClick={() => rendersetter("lista-aero")}>
                <small>Atrás</small>
              </Alert.Link>
              <br></br>
              <strong>Agregar Nueva Aerolínea</strong>
              <br></br>
              <br></br>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Escriba el nombre de la nueva aerolínea a agregar."
                    onChange={(e) => setName(e["target"]["value"])}
                  ></Form.Control>
                </Col>
                <Col>
                  <Button variant="success" block onClick={handler}>
                    Agregar nueva aerolínea
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
          header="Aerolínea agregada satisfactoriamente!"
          content={`Id: ${idPosted} - Aerolínea agregada: ${name}`}
        />
      )}
    </>
  );
};

export default NewAerolinea;
