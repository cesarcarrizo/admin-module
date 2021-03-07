import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import PostedAlert from "./PostedAlert";

const EditConsecutives = ({ editingsetter }) => {
  const [id, setId] = useState(1);
  const [llevaPrefijo, setLlevaprefijo] = useState(false);
  const [requested, setRequested] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [consecutivoToUpd, setConsecutivoToUpd] = useState(null);
  const [newRangei, setNewRangei] = useState("");
  const [newRangef, setNewRangef] = useState("");
  const [newPrefix, setNewPrefix] = useState("");

  useEffect(() => {
    getConsData();
  }, [id]);

  const getConsData = () => {
    const uri = `https://vvuelosrestfulservices.azurewebsites.net/api/Consecutivos/${id}`;

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    Axios.get(uri, config)
      .then((res) => setConsecutivoToUpd(res["data"]))
      .catch((err) => console.log(err));
  };

  const handler = () => {
    //console.log("clicked");
    if (validaciones()) {
      setRequested(true);
      let newCons = {
        id: consecutivoToUpd["id"],
        tabla: consecutivoToUpd["tabla"],
        consecutivo: consecutivoToUpd["consecutivo"],
        prefijo: llevaPrefijo ? newPrefix : null,
        rangoi: newRangei,
        rangof: newRangef,
      };
      //console.log(newCons);
      const uri = `https://vvuelosrestfulservices.azurewebsites.net/api/Consecutivos/${consecutivoToUpd["id"]}`;
      Axios.put(uri, newCons)
        .then((res) => setUpdated(true))
        .catch((err) => console.log(err));
    }
  };

  const validaciones = () => {
    if (llevaPrefijo) {
      if (newRangei === "" || newRangef === "" || newPrefix === "") {
        alert("Favor llene todos los campos!");
        return false;
      }
      if (isNaN(newRangef) || isNaN(newRangei)) {
        alert("Los rangos deben ser númericos!");
        return false;
      }
      if (newPrefix.length > 5) {
        alert("El prefijo puede sólo llevar un máximo de 5 caracteres!");
        return false;
      }
      if (newRangei >= newRangef) {
        alert("EL rango final no puede ser menor o igual al rango inicial!");
        return false;
      }
    } else {
      if (newRangei === "" || newRangef === "") {
        alert("Favor llene todos los campos!");
        return false;
      }
      if (isNaN(newRangef) || isNaN(newRangei)) {
        alert("Los rangos deben ser númericos!");
        return false;
      }
      if (newRangei >= newRangef) {
        alert("EL rango final no puede ser menor o igual al rango inicial!");
        return false;
      }
    }
    return true;
  };

  return (
    <>
      {!updated ? (
        <>
          {!requested ? (
            <Alert variant="secondary">
              <Alert.Link onClick={() => editingsetter(false)}>
                <small>Atrás</small>
              </Alert.Link>
              <br></br>
              <strong>Editar consecutivos</strong>
              <br></br>
              Selecione la tabla del consecutivo a Editar
              <Form.Control as="select">
                <option selected onClick={() => setId(1)}>
                  Países
                </option>
                <option onClick={() => setId(2)}>Aerolíneas</option>
                <option onClick={() => setId(3)}>Puertas</option>
                <option onClick={() => setId(4)}>VuelosSalidas</option>
                <option onClick={() => setId(5)}>VuelosLlegadas</option>
                <option onClick={() => setId(6)}>Boletos</option>
              </Form.Control>
              <br></br>
              {consecutivoToUpd !== null ? (
                <small>
                  Consecutivo (invariable):{" "}
                  <b>{consecutivoToUpd["consecutivo"]}</b>
                </small>
              ) : (
                <></>
              )}
              <br></br>
              <br></br>
              <Form.Check
                type="checkbox"
                label="Lleva prefijo?"
                id="check"
                onClick={() => {
                  setLlevaprefijo(!llevaPrefijo);
                }}
              />
              <br></br>
              <Row>
                <Col>
                  <small>Indicar nuevo rango inicial</small>
                  <Form.Control
                    placeholder="Ingrese nuevo rango inicial."
                    onChange={(e) => setNewRangei(e["target"]["value"])}
                  ></Form.Control>
                </Col>
                <Col>
                  <small>Indicar nuevo rango final</small>
                  <Form.Control
                    placeholder="Ingrese nuevo rango final."
                    onChange={(e) => setNewRangef(e["target"]["value"])}
                  ></Form.Control>
                </Col>
                {llevaPrefijo ? (
                  <Col>
                    <small>Indicar nuevo prefijo</small>
                    <Form.Control
                      placeholder="Ingrese nuevo prefijo."
                      onChange={(e) =>
                        setNewPrefix(e["target"]["value"].toUpperCase())
                      }
                    ></Form.Control>
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
              <br></br>
              <Button variant="success" block onClick={handler}>
                Editar consecutivo
              </Button>
            </Alert>
          ) : (
            <Spinner animation="border">
              <span className="sr-only">Loading data...</span>
            </Spinner>
          )}
        </>
      ) : (
        <PostedAlert
          header="Consecutivo editado satisfactoriamente!"
          content="Revise en la lista de consecutivos el nuevo cambio."
        />
      )}
    </>
  );
};

export default EditConsecutives;
