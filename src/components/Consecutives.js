import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Alert, Spinner, Table } from "react-bootstrap";
import EditConsecutives from "./EditConsecutives";

const Consecutives = () => {
  const [consecutivos, setConsecutivos] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getAllConsecutives();
  }, []);

  const getAllConsecutives = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(
      "https://vvuelosrestfulservices.azurewebsites.net/api/Consecutivos",
      config
    )
      .then((res) => setConsecutivos(res["data"]))
      .catch((err) => console.log(err));
    //.then((rej) => console.log(rej));
  };

  return (
    <>
      {consecutivos !== null ? (
        <>
          {!isEditing ? (
            <Alert variant="secondary">
              <strong>Consecutivos</strong>
              <br></br>
              <br></br>
              Lista de Consecutivos
              <br></br>
              <Table striped bordered hover variant="dark">
                <thead>
                  <th>Tabla</th>
                  <th>Consecutivo</th>
                  <th>Prefijo</th>
                  <th>Rango Inicial</th>
                  <th>Rango Final</th>
                </thead>
                <tbody>
                  {consecutivos.map((c) => {
                    return (
                      <tr key={c["id"]}>
                        <td>{c["tabla"]}</td>
                        <td>{c["consecutivo"]}</td>
                        <td>{c["prefijo"]}</td>
                        <td>{c["rangoi"]}</td>
                        <td>{c["rangof"]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <hr></hr>
              <Alert.Link onClick={() => setIsEditing(true)}>
                <small>Editar consecutivos</small>
              </Alert.Link>
            </Alert>
          ) : (
            <EditConsecutives editingsetter={setIsEditing} />
          )}
        </>
      ) : (
        <Spinner animation="border">
          <span className="sr-only">Loading data</span>
        </Spinner>
      )}
    </>
  );
};

export default Consecutives;
