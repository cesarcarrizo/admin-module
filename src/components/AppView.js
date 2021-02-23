import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import img from "../imgs/papelarrugado.jpg";
import Menu from "./Menu";
import NewUser from "./NewUser";
import Indicator from "./Indicator";
import Home from "./Home";
import Users from "./Users";
import UpdateUserRoles from "./UpdateUserRoles";

const AppView = ({ guest }) => {
  const [sectionToRender, setSectionToRender] = useState("home");
  return (
    <Card>
      <Card.Img variant="top" src={img}></Card.Img>
      <Card.Text>
        <Indicator ruta="dummy / dummy / alreadyonprops" guest={guest} />
      </Card.Text>
      <Card.Body>
        <Row>
          <Col>
            <Menu sectionsetter={setSectionToRender} />
          </Col>
          <Col xs="9">
            {sectionToRender === "home" ? <Home /> : <></>}
            {sectionToRender === "users" ? <Users /> : <></>}
            {sectionToRender === "new-user" ? <NewUser /> : <></>}
            {sectionToRender === "set-roles" ? <UpdateUserRoles /> : <></>}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AppView;
