import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Form, Spinner, Row, Col, Button } from "react-bootstrap";
import { read, goNext, trim, getConsecutivos } from "../store/StorageHandler";
import PostedAlert from "./PostedAlert";

const VSaliente = () => {
  const [aerolineas, setAerolineas] = useState(null);
  const [puertas, setPuertas] = useState(null);
  const [paises, setPaises] = useState(null);

  const [puerta, setPuerta] = useState(null); // seleccionada por el usuario
  const [pais, setPais] = useState(null); // seleccionada por el usuario
  const [aerolinea, setAerolinea] = useState(null); // seleccionada por el usuario
  const [fecha, setFecha] = useState(null);
  const [eta, setEta] = useState(null);
  const [estado, setEstado] = useState(null);

  const [requested, setRequested] = useState(false);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    getAerolineas();
    getPuertas();
    getPaises();
  }, []);

  const getAerolineas = () => {
    const uri =
      "https://vvuelosrestfulservices.azurewebsites.net/api/Aerolineas";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(uri, config)
      .then((res) => setAerolineas(res["data"]))
      .catch((err) => alert(err));
  };
  const getPuertas = () => {
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Puertas";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(uri, config)
      .then((res) => setPuertas(res["data"]))
      .catch((err) => alert(err));
  };

  const getPaises = () => {
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Paises";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(uri, config)
      .then((res) => setPaises(res["data"]))
      .catch((err) => alert(err));
  };

  const handler = async () => {
    if (validaciones()) {
      setRequested(true);
      const uri =
        "https://vvuelosrestfulservices.azurewebsites.net/api/VuelosSalidas";
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };

      let toPost = {
        id: await generarId(),
        aerolinea,
        destino: pais,
        fecha,
        hora: eta,
        estado,
        puerta,
      };

      Axios.post(uri, toPost, config)
        .then((res) => {
          setPosted(true);
        })
        .catch((err) => alert(err));
    }
  };

  const generarId = async () => {
    let consecutivos = await getConsecutivos();
    goNext("vs");
    return trim(consecutivos[3], read("rVuelosSalidas"));
  };

  const validaciones = () => {
    if (
      puerta === null ||
      pais === null ||
      aerolinea === null ||
      fecha === null ||
      eta === null ||
      estado === null
    ) {
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
            <>
              {aerolineas !== null && puertas !== null && paises !== null ? (
                <Alert variant="warning">
                  <br></br>
                  <strong>Indique los datos del nuevo vuelo saliente:</strong>
                  <br></br>
                  <Row>
                    <Col>
                      <label>
                        Seleccione la aerolínea correspondiente al vuelo a
                        generar:
                      </label>
                      <Form.Control as="select">
                        <option selected onClick={() => setAerolinea(null)}>
                          Seleccione una aerolínea...
                        </option>
                        {aerolineas.map((a) => {
                          return (
                            <option
                              key={a["id"]}
                              onClick={() => setAerolinea(a["nombre"])}
                            >
                              {a["nombre"]}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col>
                      <label>
                        Seleccione la puerta disponible donde saldrá el vuelo:
                      </label>
                      <Form.Control as="select">
                        <option selected onClick={() => setPuerta(null)}>
                          Seleccione una puerta...
                        </option>
                        {puertas.map((p) => {
                          if (p["estado"] === 1) {
                            return (
                              <option
                                key={p["id"]}
                                onClick={() => setPuerta(p["numero"])}
                              >
                                {p["numero"]}
                              </option>
                            );
                          }
                        })}
                      </Form.Control>
                    </Col>
                    <Col>
                      <label>Seleccione el destino del vuelo a generar:</label>
                      <Form.Control as="select">
                        <option selected onClick={() => setPais(null)}>
                          Seleccione una procedencia...
                        </option>
                        {paises.map((pa) => {
                          return (
                            <option
                              key={pa["id"]}
                              onClick={() => setPais(pa["nombre"])}
                            >
                              {pa["nombre"]}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col>
                      <label>
                        Escoja la fecha correspondiente a la salida del vuelo:
                      </label>
                      <Form.Control
                        type="date"
                        onChange={(e) => setFecha(e["target"]["value"])}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <label>Escoja la hora estimada de salida (ETD)</label>
                      <Form.Control
                        type="time"
                        onChange={(e) => setEta(e["target"]["value"])}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <label>Escoja el estado inicial del vuelo</label>
                      <Form.Control as="select">
                        <option selected onClick={() => setEstado(null)}>
                          Seleccione un estado inicial...
                        </option>
                        <option onClick={() => setEstado("Programado")}>
                          Programado
                        </option>

                        <option onClick={() => setEstado("Retrasado")}>
                          Retrasado
                        </option>
                        <option onClick={() => setEstado("Abordando")}>
                          Abordando
                        </option>
                        <option onClick={() => setEstado("Terminado")}>
                          Terminado
                        </option>
                        <option onClick={() => setEstado("EMERGENCIA")}>
                          EMERGENCIA
                        </option>
                      </Form.Control>
                    </Col>
                  </Row>
                  <br></br>
                  <br></br>
                  <Button variant="outline-warning" onClick={handler} block>
                    Generar vuelo
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
          header="Nuevo vuelo saliente agregado con éxito!"
          content="Success!"
        />
      )}
    </>
  );
};

export default VSaliente;
