import React, { Component } from "react";
import styles from "./App.css";
import { connect } from "react-redux";
import lightBulb from "./img/lightBulb.svg";
import MainBoard from "./containers/mainBoard/mainBoard";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <img src={lightBulb} alt="toMainPage" className={styles.img} />
        <MainBoard />
      </div>
    );
  }
}

export default connect()(App);
