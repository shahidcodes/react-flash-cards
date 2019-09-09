import React from "react";
import Capitalze from "../utils/capitalize";
export default function(props) {
  return (
    <div className="row">
      <div className="col s12">
        <h4>Total Questions</h4>
        <div className="collection">
          {props.cards.map((card, index) => {
            return (
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  props.handleCardClick(index);
                }}
                key={index + "card"}
                className={
                  "collection-item " +
                  (card.active ? "active blue white-text" : "blue-text ")
                }
              >
                Q. {Capitalze(card.question)}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
