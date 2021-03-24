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
import ChangePassword from "./ChangePassword";
import Consecutives from "./Consecutives";
import Paises from "./Paises";
import Aerolineas from "./Aerolineas";
import Puertas from "./Puertas";
import CAerolineas from "./CAerolineas";
import CPuertas from "./CPuertas";
import CDescargas from "./CDescargas";
import CErrores from "./CErrores";
import CBitacora from "./CBitacora";
import { Button } from "react-bootstrap";

const AppView = ({ guest, displaysetter, sessioncloser, session }) => {
  const [sectionToRender, setSectionToRender] = useState("home");
  const [routetoken, setRoutetoken] = useState(0);
  return (
    <Card>
      <Card.Img variant="top" src={img}></Card.Img>
      <Card.Text>
        <Indicator ruta={routetoken} guest={guest} />
      </Card.Text>

      <Card.Body>
        <Row>
          <Col>
            <Button
              variant="outline-danger"
              size="sm"
              block
              onClick={() => {
                displaysetter("login");
                sessioncloser(!session);
              }}
            >
              Cerrar sesión
            </Button>
            <hr />
            <Menu
              sectionsetter={setSectionToRender}
              routesetter={setRoutetoken}
              role={guest["rol"]}
            />
          </Col>
          <Col xs="9">
            {sectionToRender === "home" ? <Home /> : <></>}
            {sectionToRender === "users" ? <Users /> : <></>}
            {sectionToRender === "new-user" ? <NewUser /> : <></>}
            {sectionToRender === "set-roles" ? <UpdateUserRoles /> : <></>}
            {sectionToRender === "chg-passwd" ? (
              <ChangePassword guest={guest} />
            ) : (
              <></>
            )}
            {sectionToRender === "cons" ? <Consecutives /> : <></>}
            {sectionToRender === "paises" ? <Paises /> : <></>}
            {sectionToRender === "aerolineas" ? <Aerolineas /> : <></>}
            {sectionToRender === "puertas" ? <Puertas /> : <></>}
            {sectionToRender === "c-bitacora" ? <CBitacora /> : <></>}
            {sectionToRender === "c-errores" ? <CErrores /> : <></>}
            {sectionToRender === "c-descargas" ? <CDescargas /> : <></>}
            {sectionToRender === "c-aerolineas" ? <CAerolineas /> : <></>}
            {sectionToRender === "c-puertas" ? <CPuertas /> : <></>}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AppView;
