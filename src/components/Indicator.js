import React from "react";
import { Alert } from "react-bootstrap";

const Indicator = ({ ruta, guest }) => {
  return (
    <Alert variant="light">
      Bienvenido: {guest["nombrecompleto"]}
      <hr></hr>
      Actualmente esta en: {ruta}
    </Alert>
  );
};

export default Indicator;
