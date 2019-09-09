import React, { Component } from "react";
import Nav from "./components/Nav";
import Card from "./components/Card";
import CardList from "./components/CardList";
import AddCard from "./components/AddCard";
import firebase from "firebase";
import M from "materialize-css/dist/js/materialize.min.js";
export default class App extends Component {
  state = {
    cards: [],
    currentCard: {
      question: "n/a",
      answer: "n/a",
      topic: ""
    },
    currentIndex: 0,
    modelIsOpen: false
  };
  componentDidMount() {
    firebase
      .auth()
      .signInWithEmailAndPassword("test@gmail.com", "test123")
      .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
        // M.toast({ html: `Error: ${errorMessage}` });
      })
      .then(() => {
        let currentUser = firebase.auth().currentUser;
        console.log(currentUser.uid);
        if (currentUser) {
          firebase
            .database()
            .ref(`flashCards/${currentUser.uid}/cards`)
            .on("child_added", snapshot => {
              let card = snapshot.val();
              let cards = this.state.cards;
              cards.push(card);
              cards.forEach(card => (card.active = false));
              card.active = true;
              this.setState({
                cards,
                currentCard: card,
                currentIndex: cards.length - 1
              });
            });
        }
      });
  }
  handleNextCard(e) {
    if (this.state.cards.length > this.state.currentIndex + 1) {
      this.handleCardClick(this.state.currentIndex + 1);
    } else {
      console.log("no next card");
      M.toast({ html: "Voila! You have reviewed all the cards." });
    }
  }
  handleCardClick(index) {
    let cards = this.state.cards;
    cards.forEach(card => (card.active = false));
    cards[index].active = true;
    this.setState({
      currentCard: this.state.cards[index],
      cards,
      currentIndex: index
    });
  }

  handleAddClick = () => {
    this.setState({
      modelIsOpen: true
    });
  };

  handleCardAdd = ({ question, answer, topic } = {}) => {
    let currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      M.toast({ html: "Login Please!" });
      return;
    }
    firebase
      .database()
      .ref(`flashCards/${currentUser.uid}/cards`)
      .push(
        {
          question,
          answer,
          topic,
          timestamp: new Date().getTime()
        },
        err => {
          if (!err) {
            M.toast({ html: "Card Added" });
            this.setState({ modelIsOpen: false });
          }
        }
      );
  };

  render() {
    return (
      <div>
        <Nav handleAddClick={this.handleAddClick} />
        <div className="container">
          <Card
            touchInput={
              "ontouchstart" in window || navigator.msMaxTouchPoints > 0
            }
            handleNextCard={this.handleNextCard.bind(this)}
            currentCard={this.state.currentCard}
          />
          <CardList
            handleCardClick={this.handleCardClick.bind(this)}
            cards={this.state.cards}
          />
        </div>
        <AddCard
          modalStateChange={modelIsOpen => {
            this.setState({
              modelIsOpen
            });
          }}
          handleCardAdd={this.handleCardAdd}
          modelIsOpen={this.state.modelIsOpen}
        />
      </div>
    );
  }
}
