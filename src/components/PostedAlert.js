import React from "react";
import { Alert } from "react-bootstrap";

const PostedAlert = ({ header, content }) => {
  return (
    <Alert variant="success">
      <Alert.Heading>{header}</Alert.Heading>
      <p>{content}</p>
      <hr></hr>
      <p>Para continuar seleccione una opción del menú lateral.</p>
    </Alert>
  );
};

export default PostedAlert;
