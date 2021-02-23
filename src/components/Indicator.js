import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const Indicator = ({ ruta, guest }) => {
  const [str, setStr] = useState("Home");

  useEffect(() => {
    switch (ruta) {
      case 0:
        setStr("Home");
        break;
      case 1:
        setStr("Seguridad / Usuarios");
        break;
      case 2:
        setStr("Seguridad / Crear Usuarios");
        break;
      case 3:
        setStr("Seguridad / Actualizar roles");
        break;
      case 4:
        setStr("Seguridad / Cambiar contraseña");
        break;
    }
  });

  return (
    <Alert variant="light">
      Bienvenido: {guest["nombrecompleto"]}
      <hr></hr>
      Actualmente esta en: {str}
    </Alert>
  );
};

export default Indicator;
