import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../imgs/bgimage.jpg";
import LoginPopover from "./LoginPopover";

const LoginView = ({ users }) => {
  const [userToAuth, setUserToAuth] = useState("");
  const [passToAuth, setPassToAuth] = useState("");
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
              users={users}
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
