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
      case 5:
        setStr("Administración / Consecutivos");
        break;
      case 6:
        setStr("Administración / Países");
        break;
      case 7:
        setStr("Administración / Aerolíneas");
        break;
      case 8:
        setStr("Administración / Puertas");
        break;
      case 9:
        setStr("Consultas / Bitácora");
        break;
      case 10:
        setStr("Consultas / Errores");
        break;
      case 11:
        setStr("Consultas / Descargas");
        break;
      case 12:
        setStr("Consultas / Aerolíneas");
        break;
      case 13:
        setStr("Consultas / Puertas");
        break;
      default:
        setStr("Error retriving the str.");
        break;
    }
  });

  return (
    <Alert variant="light">
      Bienvenido: {guest["nombrecompleto"]}
      <hr></hr>
      Actualmente está en: {str}
    </Alert>
  );
};

export default Indicator;
