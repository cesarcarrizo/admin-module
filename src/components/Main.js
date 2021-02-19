import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../imgs/bgimage.jpg";
import LoginPopover from "./LoginPopover";

const Main = () => {
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
            <LoginPopover />
          </Col>
        </Row>
        <hr />
        <Card.Img variant="bottom" src={img} />
      </Card.Body>
    </Card>
  );
};

export default Main;
