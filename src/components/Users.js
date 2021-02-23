import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";

const Users = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

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

  return (
    <>
      {users !== null ? (
        <Alert variant="secondary">
          <p>Todos los usuarios registrados</p>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Username</th>
                <th>Nombre Completo</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                return (
                  <tr key={u["username"]}>
                    <td>{u["username"]}</td>
                    <td>{u["nombrecompleto"]}</td>
                    <td>{str(u["rol"])}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Alert>
      ) : (
        <Spinner animation="border">
          <span className="sr-only">Loading data...</span>
        </Spinner>
      )}
    </>
  );
};

export default Users;
