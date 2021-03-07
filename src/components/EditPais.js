import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import PostedAlert from "./PostedAlert";

const EditPais = ({ rendersetter }) => {
  const [newName, setNewName] = useState("");
  const [oldName, setOldName] = useState(null);
  const [id, setId] = useState(null);
  const [paises, setPaises] = useState(null);
  const [requested, setRequested] = useState(false);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    const uri = "https://vvuelosrestfulservices.azurewebsites.net/api/Paises";
    Axios.get(uri).then((res) => setPaises(res["data"]));
  }, []);

  const handler = () => {
    if (validaciones()) {
      setRequested(true);
      const uri = `https://vvuelosrestfulservices.azurewebsites.net/api/Paises/${id}`;
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
        "El nombre que digitó ya está configurado como el nombre actual del país!"
      );
      return false;
    }
    if (!isNaN(newName)) {
      alert("Ingrese un nombre válido! Sin números!");
      return false;
    }
    if (newName === "") {
      alert("Ingrese un nombre para editar el país!");
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
              {paises !== null ? (
                <Alert variant="secondary">
                  <Alert.Link onClick={() => rendersetter("lista-paises")}>
                    <small>Atrás</small>
                  </Alert.Link>
                  <br></br>
                  <strong>Editar nombre de un país</strong>
                  <br></br>
                  <br></br>
                  <small>Seleccione el país a editar el nombre</small>
                  <Form.Control as="select">
                    <option selected>Seleccione un país...</option>
                    {paises.map((p) => {
                      return (
                        <option
                          key={p["id"]}
                          onClick={() => {
                            setOldName(p["nombre"]);
                            setId(p["id"]);
                          }}
                        >
                          ID: {p["id"]} - Nombre: {p["nombre"]}
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
          header="Nombre de país editado con éxito!"
          content={`${oldName} pasó a llamarse: ${newName}`}
        />
      )}
    </>
  );
};

export default EditPais;
