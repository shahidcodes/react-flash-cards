import React from "react";
import { Navbar, NavItem } from "react-materialize";
export default function(props) {
  return (
    <Navbar
      alignLinks="right"
      brand={<a href="#home">React Flash Card</a>}
      className="blue darken-2"
    >
      <NavItem onClick={() => props.handleAddClick()}>ADD CARD</NavItem>
    </Navbar>
  );
}
