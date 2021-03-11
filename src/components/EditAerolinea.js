import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import PostedAlert from "./PostedAlert";

const EditAerolinea = ({ rendersetter }) => {
  const [newName, setNewName] = useState("");
  const [oldName, setOldName] = useState(null);
  const [id, setId] = useState(null);
  const [aerolineas, setAerolineas] = useState(null);
  const [requested, setRequested] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const uri =
      "https://vvuelosrestfulservices.azurewebsites.net/api/Aerolineas";
    Axios.get(uri).then((res) => setAerolineas(res["data"]));
  }, []);

  const handler = () => {
    if (validaciones()) {
      setRequested(true);
      const uri = `https://vvuelosrestfulservices.azurewebsites.net/api/Aerolineas/${id}`;
      const toUpdt = {
        id,
        nombre: newName,
      };
      Axios.put(uri, toUpdt)
        .then((res) => setUpdated(true))
        .catch((err) => console.log(err));
    }
  };

  const validaciones = () => {
    if (oldName.toLowerCase() === newName.toLowerCase()) {
      alert(
        "El nombre que digitó ya está configurado como el nombre actual de la aerolínea!"
      );
      return false;
    }
    if (!isNaN(newName)) {
      alert("Ingrese un nombre válido! Sin números!");
      return false;
    }
    if (newName === "") {
      alert("Ingrese un nombre para editar la aerolínea!");
      return false;
    }
    return true;
  };

  return (
    <>
      {!updated ? (
        <>
          {!requested ? (
            <>
              {aerolineas !== null ? (
                <Alert variant="secondary">
                  <Alert.Link onClick={() => rendersetter("lista-aero")}>
                    <small>Atrás</small>
                  </Alert.Link>
                  <br></br>
                  <strong>Editar nombre de una aerolínea</strong>
                  <br></br>
                  <br></br>
                  <small>Seleccione la aerolínea a editar el nombre</small>
                  <Form.Control as="select">
                    <option selected>Seleccione una aerolínea...</option>
                    {aerolineas.map((a) => {
                      return (
                        <option
                          key={a["id"]}
                          onClick={() => {
                            setOldName(a["nombre"]);
                            setId(a["id"]);
                          }}
                        >
                          ID: {a["id"]} - Nombre: {a["nombre"]}
                        </option>
                      );
                    })}
                  </Form.Control>
                  <br></br>
                  <br></br>

                  <Form.Control
                    placeholder="Ingrese el nuevo nombre"
                    onChange={(e) => setNewName(e["target"]["value"])}
                  ></Form.Control>
                  <br></br>
                  <br></br>
                  {oldName !== null && id !== null ? (
                    <Button variant="success" block onClick={handler}>
                      Editar nombre
                    </Button>
                  ) : (
                    <></>
                  )}
                </Alert>
              ) : (
                <Spinner animation="border" />
              )}
            </>
          ) : (
            <Spinner animation="border" />
          )}
        </>
      ) : (
        <PostedAlert
          header="Nombre de la aerolínea editado con éxito!"
          content={`${oldName} pasó a llamarse: ${newName}`}
        />
      )}
    </>
  );
};

export default EditAerolinea;
