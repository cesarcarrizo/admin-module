import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../imgs/bgimage.jpg";
import LoginPopover from "./LoginPopover";

const LoginView = ({ users, displaysetter, guestsetter }) => {
  const [userToAuth, setUserToAuth] = useState("");
  const [passToAuth, setPassToAuth] = useState("");
  const [onClick, setOnClick] = useState(null);

  useEffect(() => {
    if (onClick === null) return;
    //console.dir(onClick);
    if (authentication(userToAuth, passToAuth)) {
      guestsetter(guest);
      displaysetter("app");
    }
  }, [onClick]);

  let guest = {};

  const authentication = (user, pass) => {
    if (user === "" || pass === "") {
      alert("Favor llenar todos los campos del Login!");
      return false;
    }
    // 0: no hubo match, 1: autenticado satisfactoriamente.
    let count = 0;
    users.map((userMapped) => {
      if (userMapped["username"] === user && userMapped["passwd"] === pass) {
        guest = userMapped;
        return count++;
      }
    });
    if (count === 1) return true;
    alert("Ingrese un Username y/o Password válidos!");
    return false;
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col>
            <Card.Text>
              Bienvenido al módulo de gestión principal del aeropuerto.
            </Card.Text>
          </Col>
          <Col>
            <LoginPopover
              usersetter={setUserToAuth}
              passsetter={setPassToAuth}
              triggersetter={setOnClick}
              trigger={onClick}
            />
          </Col>
        </Row>
        <hr />
        <Card.Img variant="bottom" src={img} />
      </Card.Body>
    </Card>
  );
};

export default LoginView;
