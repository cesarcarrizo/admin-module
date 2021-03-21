import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const EditPuerta = ({ rendersetter }) => {
  const [state, setState] = useState(null);
  return (
    <Alert variant="secondary">
      <Alert.Link onClick={() => rendersetter("lista-puertas")}>
        <small>Atrás</small>
      </Alert.Link>
      <br></br>
      <strong>Editar Puerta</strong>
      <br></br>
      <br></br>
    </Alert>
  );
};

export default EditPuerta;
