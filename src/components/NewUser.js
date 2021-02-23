import React, { useState } from "react";
import Axios from "axios";
import { Alert, Form, Button, Spinner } from "react-bootstrap";
import PostedAlert from "./PostedAlert";

const NewUser = () => {
  const [newUser, setNewUser] = useState("");
  const [pass, setPass] = useState("");
  const [passconf, setPassconf] = useState("");
  const [nomb, setNomb] = useState("");
  const [rol, setRol] = useState(0);
  const [posted, setPosted] = useState(false);
  const [requested, setRequested] = useState(false);

  const handler = () => {
    if (validaciones()) {
      setRequested(true);
      postNewUser();
    }
  };

  const enumerate = (str) => {
    switch (str) {
      case "Administrador":
        return 0;
      case "Seguridad":
        return 1;
      case "Mantenimiento":
        return 2;
      case "Consecutivo":
        return 3;
      case "Consultas":
        return 4;
      default:
        return new Error(
          "enumerate(str) esta recibiendo un parametro invalido."
        );
    }
  };

  const postNewUser = () => {
    const config = {
      headers: {
        "Allow-Control-Allow-Origin": "*",
      },
    };
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Usuarios";

    // los keys del objeto a hacer post debe ser del mismo nombre que en el objeto del entity
    const toPost = {
      username: newUser,
      nombrecompleto: nomb,
      passwd: pass,
      rol,
    };

    Axios.post(uri, toPost, config)
      .then((res) => {
        setPosted(true);
      })
      .then((rej) => console.log(rej))
      .catch((err) => console.log(err));
  };

  const validaciones = () => {
    if (newUser === "" || pass === "" || passconf === "" || nomb === "") {
      alert(
        "Favor llenar todos los campos para agregar al usuario correctamente!"
      );
      return false;
    }
    if (pass !== passconf) {
      alert("Las contraseñas deben coincidir una con la otra!");
      return false;
    }
    return true;
  };

  return (
    <>
      {posted ? (
        <PostedAlert
          header="Nuevo usuario agregado con éxito!"
          content={`Username: ${newUser} - Nombre: ${nomb} agregado a la BD!`}
        />
      ) : (
        <>
          {requested ? (
            <Spinner animation="border">
              <span className="sr-only">Loading data...</span>
            </Spinner>
          ) : (
            <Alert variant="secondary">
              <strong>Usuarios</strong>
              <br></br>
              Crear nueva cuenta
              <br></br>
              <br></br>
              <br></br>
              <Form.Control
                placeholder="Nuevo usuario"
                onChange={(e) => setNewUser(e["target"]["value"])}
              ></Form.Control>
              <br></br>
              <Form.Control
                placeholder="Nueva contraseña"
                onChange={(e) => setPass(e["target"]["value"])}
              ></Form.Control>
              <br></br>
              <Form.Control
                placeholder="Confirmar nueva contraseña"
                onChange={(e) => setPassconf(e["target"]["value"])}
              ></Form.Control>
              <br></br>
              <Form.Control
                placeholder="Nombre completo"
                onChange={(e) => setNomb(e["target"]["value"])}
              ></Form.Control>
              <br></br>
              <small>Seleccione el rol del nuevo usuario</small>
              <Form.Control
                as="select"
                onChange={(e) => setRol(enumerate(e["target"]["value"]))}
              >
                <option selected>Administrador</option>
                <option>Seguridad</option>
                <option>Mantenimiento</option>
                <option>Consecutivo</option>
                <option>Consultas</option>
              </Form.Control>
              <br></br>
              <br></br>
              <br></br>
              <Button variant="success" block onClick={handler}>
                Crear usuario
              </Button>
            </Alert>
          )}
        </>
      )}
    </>
  );
};

export default NewUser;
