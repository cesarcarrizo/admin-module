import React, { useState } from "react";
import { Alert, Row, Col, Button } from "react-bootstrap";

import VEntrante from "./VEntrante";
import VSaliente from "./VSaliente";

const Home = ({ role }) => {
  const [saliente, setSaliente] = useState(false);
  const [entrante, setEntrante] = useState(false);
  const instructions = (role) => {
    switch (role) {
      case 0:
        return (
          <ul>
            <li>Crear o editar nuevos usuarios y/o usuarios ya existentes</li>
            <li>Crear o editar nuevas aerolíneas</li>
            <li>Crear o editar nuevos países</li>
            <li>Crear o editar nuevas puertas</li>
            <li>Editar consecutivos</li>
            <li>Crear vuelos salientes</li>
            <li>Crear vuelos entrantes</li>
            <li>Consultar bitácoras</li>
            <li>Consultar errores</li>
            <li>Cambiar de contraseña</li>
          </ul>
        );
      case 1:
        return (
          <ul>
            <li>Crear o editar nuevos usuarios y/o usuarios ya existentes</li>
            <li>Cambiar de contraseña</li>
          </ul>
        );
      case 3:
        return (
          <ul>
            <li>Editar consecutivos</li>
            <li>Cambiar de contraseña</li>
          </ul>
        );
      case 2:
        return (
          <ul>
            <li>Crear o editar nuevas aerolíneas</li>
            <li>Crear o editar nuevos países</li>
            <li>Crear o editar nuevas puertas</li>
            <li>Editar consecutivos</li>
            <li>Cambiar de contraseña</li>
          </ul>
        );
      case 4:
        return (
          <ul>
            <li>Realizar consultas</li>
            <li>Cambiar de contraseña</li>
          </ul>
        );
      default:
        return (
          <ul>
            <li>ERROR at ./Homs.js component!</li>
          </ul>
        );
    }
  };

  return (
    <Alert variant="secondary">
      <h1>Bienvenido al sitio web del staff de V-Vuelos!</h1>
      <p>
        En este módulo administrativo, utilizando el menú de la barra lateral se
        puede:
      </p>
      {instructions(role)}
      <hr />
      <>
        {role === 0 ? (
          <>
            <small>
              <b>Agregue un vuelo entrante o saliente</b>
            </small>
            <hr />
            <Row>
              <Col>
                <Alert variant="success">
                  <p>Agregar vuelo saliente</p>
                  <Button
                    variant="outline-dark"
                    block
                    onClick={() => {
                      setEntrante(false);
                      setSaliente(true);
                    }}
                  >
                    Agregar ya!
                  </Button>
                </Alert>
              </Col>
              <Col>
                <Alert variant="success">
                  <p>Agregar vuelo entrante (descarga)</p>
                  <Button
                    variant="outline-dark"
                    block
                    onClick={() => {
                      setSaliente(false);
                      setEntrante(true);
                    }}
                  >
                    Agregar ya!
                  </Button>
                </Alert>
              </Col>
            </Row>
          </>
        ) : (
          <></>
        )}
        {saliente ? <VSaliente /> : <></>}
        {entrante ? <VEntrante /> : <></>}
      </>
    </Alert>
  );
};

export default Home;
