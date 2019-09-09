import React from "react";
import { Row, Col, CardPanel, Button } from "react-materialize";
import Capitalize from "../utils/capitalize";
function Card(props) {
  return (
    <div>
      <Row>
        <Col className="card-container s10 m8 ">
          <CardPanel className="qcard front">
            <div className="flow-text">
              Q. {Capitalize(props.currentCard.question)}
            </div>
          </CardPanel>
          <CardPanel className="qcard back">
            <div className="flow-text">
              A. {Capitalize(props.currentCard.answer)}
            </div>
          </CardPanel>
        </Col>
      </Row>
      <Row>
        <Col className="s12 m8">
          {props.touchInput && <p>Tip: Tap on the card to reveal answer!</p>}
        </Col>
        <Col className="s10 m8 l12">
          <Button
            onClick={e => {
              props.handleNextCard(e);
            }}
            className="blue darken-4"
          >
            Next Card
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Card;
