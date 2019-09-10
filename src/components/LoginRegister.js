import React, { useState } from "react";
import { Modal, Button, TextInput } from "react-materialize";
function LoginRegister(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Modal
      header="Login/Register"
      actions={[
        <Button
          onClick={() =>
            props.handleRegisterClick({ username, password }, true)
          }
          waves="green"
          flat
        >
          Register
        </Button>,
        <Button
          onClick={() =>
            props.handleRegisterClick({ username, password }, false)
          }
          waves="green"
          flat
        >
          Login
        </Button>
      ]}
      options={{
        onCloseEnd: () => props.modalStateChange(false),
        onOpenEnd: () => props.modalStateChange(true)
      }}
      open={props.loginRegisterIsOpen}
    >
      <TextInput onChange={e => setUsername(e.target.value)} label="Email" />
      <TextInput onChange={e => setPassword(e.target.value)} label="Password" />
    </Modal>
  );
}

export default LoginRegister;
