import React from "react";
import Popover from "react-bootstrap/Popover";
import InputGroup from "react-bootstrap/InputGroup";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";

const LoginPopover = ({ usersetter, passsetter, triggersetter, trigger }) => {
  const handler = () => {
    if (trigger === null) trigger = false;
    triggersetter(!trigger);
  };

  const loginPopover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Login</Popover.Title>
      <Popover.Content>
        <InputGroup size="sm">
          <InputGroup.Prepend>
            <InputGroup.Text>Username</InputGroup.Text>
          </InputGroup.Prepend>
          <input
            type="text"
            className="form-control"
            onChange={(e) => usersetter(e["target"]["value"])}
          />
        </InputGroup>
        <br></br>
        <InputGroup size="sm">
          <InputGroup.Prepend>
            <InputGroup.Text>Password</InputGroup.Text>
          </InputGroup.Prepend>
          <input
            type="password"
            className="form-control"
            onChange={(e) => passsetter(e["target"]["value"])}
          />
        </InputGroup>
        <br></br>

        <Button variant="outline-success" block onClick={handler}>
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
