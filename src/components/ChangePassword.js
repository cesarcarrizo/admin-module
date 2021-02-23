import Axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import PostedAlert from "./PostedAlert";

const ChangePassword = ({ guest }) => {
  const [actual, setActual] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [requested, setRequested] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handler = () => {
    if (validaciones()) {
      setRequested(true);
      const uri = `https://vvuelosrestfulservices.azurewebsites.net/api/Usuarios/${guest["username"]}`;
      guest["passwd"] = newPass;
      Axios.put(uri, guest)
        .then((res) => {
          setUpdated(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const validaciones = () => {
    if (actual === "" || newPass === "" || confirm === "") {
      alert("Favor llenar todos los campos!");
      return false;
    }
    if (actual !== guest["passwd"]) {
      alert("Ingrese su contrseña actual correctamente!");
      return false;
    }
    if (newPass !== confirm) {
      alert("Las contraseñas nuevas deben coincidir!");
      return false;
    }
    return true;
  };

  return (
    <>
      {!updated ? (
        <>
          {!requested ? (
            <Alert variant="secondary">
              <strong>Cambiar contraseña</strong>
              <br></br>
              <br></br>
              <br></br>
              <Form.Control
                placeholder="Ingrese su contraseña actual"
                type="password"
                onChange={(e) => setActual(e["target"]["value"])}
              ></Form.Control>{" "}
              <br></br>
              <Form.Control
                placeholder="Ingrese su contraseña nueva"
                type="password"
                onChange={(e) => setNewPass(e["target"]["value"])}
              ></Form.Control>{" "}
              <br></br>
              <Form.Control
                placeholder="Confirme su contraseña nueva"
                type="password"
                onChange={(e) => setConfirm(e["target"]["value"])}
              ></Form.Control>{" "}
              <br></br>
              <br></br>
              <Button variant="info" block onClick={handler}>
                Cambiar contraseña
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
          header="Contraseña actualizada exitosamente!"
          content="Recuerde nunca compartir su contraseña."
        />
      )}
    </>
  );
};

export default ChangePassword;
