import React, { Component } from "react";
import { Modal, TextInput, Button } from "react-materialize";

export default class AddCard extends Component {
  state = {
    question: "",
    answer: "",
    topic: ""
  };
  render() {
    return (
      <Modal
        header="Add a card"
        actions={[
          <Button waves="green" modal="close" flat>
            Close
          </Button>,
          <Button
            onClick={() => this.props.handleCardAdd(this.state)}
            waves="green"
            modal="close"
            flat
          >
            Add
          </Button>
        ]}
        options={{
          onCloseEnd: () => this.props.modalStateChange(false),
          onOpenEnd: () => this.props.modalStateChange(true)
        }}
        open={this.props.modelIsOpen}
      >
        <TextInput
          onChange={e => this.setState({ question: e.target.value })}
          label="Card Question"
        />
        <TextInput
          onChange={e => this.setState({ answer: e.target.value })}
          label="Card Answer"
        />
        <TextInput
          onChange={e => this.setState({ topic: e.target.value })}
          label="Card Topic Name"
        />
      </Modal>
    );
  }
}
