import React, { Component } from "react";
import Nav from "./components/Nav";
import Card from "./components/Card";
import CardList from "./components/CardList";
import AddCard from "./components/AddCard";
import firebase from "firebase";
import M from "materialize-css/dist/js/materialize.min.js";
import LoginRegister from "./components/LoginRegister";
export default class App extends Component {
  DEFAULT_STATE = {
    cards: [],
    currentCard: {
      question: "n/a",
      answer: "n/a",
      topic: ""
    },
    currentIndex: 0,
    modelIsOpen: false,
    loginRegisterIsOpen: false,
    isLoggedIn: false
  };
  state = Object.assign(this.DEFAULT_STATE);
  componentDidMount() {
    window.firebase = firebase;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLoggedIn: true
        });
        firebase
          .database()
          .ref(`flashCards/${user.uid}/cards`)
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
      } else {
        this.setState({
          ...this.DEFAULT_STATE,
          cards: []
        });
      }
    });

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword("test@gmail.com", "test123")
    //   .catch(function(error) {
    //     var errorMessage = error.message;
    //     console.log(errorMessage);
    //     // M.toast({ html: `Error: ${errorMessage}` });
    //   })
    //   .then(() => {
    //     let currentUser = firebase.auth().currentUser;
    //     console.log(currentUser.uid);
    //     if (currentUser) {
    //     }
    //   });
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

    firebase
      .database()
      .ref(`flashCards/${currentUser.uid}/topics/${topic}`)
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

  handleLoginClick = () => {
    if (this.state.isLoggedIn) {
      // logout
      firebase.auth().signOut();
    } else {
      this.setState({
        loginRegisterIsOpen: true
      });
    }
  };

  handleRegisterClick = (data, shouldRegister) => {
    if (shouldRegister) {
      // register
      firebase
        .auth()
        .createUserWithEmailAndPassword(data.username, data.password)
        .then(userCreds => {
          console.log(userCreds);
        })
        .catch(err => {
          console.error(err);
          M.toast({ html: err.message });
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.username, data.password)
        .then(data => {
          console.log("user logged in ", data);
          M.toast({ html: `Logged in with ${data.user.email}` });
          this.setState({ loginRegisterIsOpen: false });
        })
        .catch(err => {
          M.toast({ html: `Failed to login ${err.message}` });
        });
    }
  };

  render() {
    return (
      <div>
        <Nav
          isLoggedIn={this.state.isLoggedIn}
          handleLoginClick={this.handleLoginClick}
          handleAddClick={this.handleAddClick}
        />
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
        <LoginRegister
          modalStateChange={loginRegisterIsOpen => {
            this.setState({
              loginRegisterIsOpen
            });
          }}
          isLoggedIn={this.state.isLoggedIn}
          handleRegisterClick={this.handleRegisterClick}
          loginRegisterIsOpen={this.state.loginRegisterIsOpen}
        />
      </div>
    );
  }
}
