import React from "react";
import Alert from "react-bootstrap/Alert";

const Menu = ({ sectionsetter, routesetter }) => {
  return (
    <Alert variant="secondary">
      <Alert.Link
        onClick={() => {
          sectionsetter("home");
          routesetter(0);
        }}
      >
        Home
      </Alert.Link>
      <br></br>
      <br></br>
      <br></br>

      <Alert.Link>Seguridad</Alert.Link>
      <br></br>

      <Alert.Link
        onClick={() => {
          sectionsetter("users");
          routesetter(1);
        }}
      >
        <small>Usuarios</small>
      </Alert.Link>
      <br></br>

      <Alert.Link
        onClick={() => {
          sectionsetter("new-user");
          routesetter(2);
        }}
      >
        <small>Crear Usuario</small>
      </Alert.Link>
      <br></br>

      <Alert.Link
        onClick={() => {
          sectionsetter("set-roles");
          routesetter(3);
        }}
      >
        <small>Asignar Roles</small>
      </Alert.Link>
      <br></br>

      <Alert.Link
        onClick={() => {
          sectionsetter("chg-passwd");
          routesetter(4);
        }}
      >
        <small>Cambiar contraseña</small>
      </Alert.Link>
      <br></br>

      <Alert.Link>Administración</Alert.Link>
      <br></br>

      <Alert.Link>
        <small>Consecutivos</small>
      </Alert.Link>
      <br></br>

      <Alert.Link>
        <small>Países</small>
      </Alert.Link>
      <br></br>

      <Alert.Link>
        <small>Aerolíneas</small>
      </Alert.Link>
      <br></br>

      <Alert.Link>
        <small>Puertas de aeropuerto</small>
      </Alert.Link>
      <br></br>
      <Alert.Link>Consultas</Alert.Link>
      <br></br>

      <Alert.Link>
        <small>Bitácora</small>
      </Alert.Link>
      <br></br>
      <Alert.Link>
        <small>Errores</small>
      </Alert.Link>
      <br></br>
      <Alert.Link>
        <small>Descargas</small>
      </Alert.Link>
      <br></br>
      <Alert.Link>
        <small>Aerolíneas</small>
      </Alert.Link>
      <br></br>
      <Alert.Link>
        <small>Puertas</small>
      </Alert.Link>
      <br></br>
    </Alert>
  );
};

export default Menu;
