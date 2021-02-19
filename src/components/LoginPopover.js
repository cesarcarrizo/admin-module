import React from "react";
import Popover from "react-bootstrap/Popover";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

const LoginPopover = () => {
  const loginPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Login</Popover.Title>
      <Popover.Content>
        <InputGroup size="sm">
          <InputGroup.Prepend>
            <InputGroup.Text>Username</InputGroup.Text>
          </InputGroup.Prepend>
          <input type="text" className="form-control" />
        </InputGroup>
        <br></br>
        <InputGroup size="sm">
          <InputGroup.Prepend>
            <InputGroup.Text>Password</InputGroup.Text>
          </InputGroup.Prepend>
          <input type="password" className="form-control" />
        </InputGroup>
        <br></br>

        <Button variant="outline-success" block>
          Iniciar sesión
        </Button>
      </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={loginPopover}>
      <Button variant="outline-secondary" block>
        Iniciar sesión
      </Button>
    </OverlayTrigger>
  );
};

export default LoginPopover;
