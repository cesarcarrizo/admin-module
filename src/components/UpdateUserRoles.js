import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Alert, Form, Button, Spinner } from "react-bootstrap";
import PostedAlert from "./PostedAlert";

const UpdateUserRoles = () => {
  const [users, setUsers] = useState(null);
  const [newRole, setNewRole] = useState(0);
  const [userToUpd, setUserToUpd] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [requested, setRequested] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

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
  const str = (num) => {
    switch (num) {
      case 0:
        return "Administrador";
      case 1:
        return "Seguridad";
      case 2:
        return "Mantenimiento";
      case 3:
        return "Consecutivo";
      case 4:
        return "Consultas";
      default:
        return new Error("str(num) posee un parametro invalido.");
    }
  };

  const getAllUsers = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(
      "https://vvuelosrestfulservices.azurewebsites.net/api/Usuarios",
      config
    )
      .then((res) => setUsers(res["data"]))
      .catch((err) => console.log(err));
  };

  const handler = () => {
    if (userToUpd === null) {
      alert("Seleccione un usuario!");
      return;
    }
    setRequested(true);

    const uri = `https://vvuelosrestfulservices.azurewebsites.net/api/Usuarios/${userToUpd["username"]}`;
    userToUpd["rol"] = newRole;
    Axios.put(uri, userToUpd)
      .then((res) => setUpdated(true))
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!updated ? (
        <>
          {users !== null ? (
            <>
              {!requested ? (
                <Alert variant="secondary">
                  <strong>Actualizar roles</strong>
                  <br></br>
                  Seleccione un nombre de usuario en la lista para actualizar su
                  rol.
                  <br></br>
                  <br></br>
                  <br></br>
                  <small>Lista de usuarios</small>
                  <br></br>
                  <Form.Control as="select">
                    <option selected>Seleccione un username...</option>
                    {users.map((u) => {
                      return (
                        <option
                          key={u["username"]}
                          onClick={() => setUserToUpd(u)}
                        >
                          {u["username"]}
                        </option>
                      );
                    })}
                  </Form.Control>
                  <br></br>
                  <small>Nuevo rol</small>
                  <br></br>
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      setNewRole(enumerate(e["target"]["value"]))
                    }
                  >
                    <option selected>Administrador</option>
                    <option>Seguridad</option>
                    <option>Mantenimiento</option>
                    <option>Consecutivo</option>
                    <option>Consultas</option>
                  </Form.Control>
                  <br></br>
                  <br></br>
                  <Button variant="info" block onClick={handler}>
                    Actualizar Rol
                  </Button>
                </Alert>
              ) : (
                <Spinner animation="border">
                  <span className="sr-only">Loading data</span>
                </Spinner>
              )}
            </>
          ) : (
            <Spinner animation="border">
              <span className="sr-only">Loading data...</span>
            </Spinner>
          )}
        </>
      ) : (
        <PostedAlert
          header="Nuevo rol asignado satisfactoriamente!"
          content={`Usuario: ${userToUpd["username"]} - Nuevo rol: ${str(
            userToUpd["rol"]
          )}`}
        />
      )}
    </>
  );
};

export default UpdateUserRoles;
