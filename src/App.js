import React, { Component } from "react";
import styles from "./App.css";
import { connect } from "react-redux";
import lightBulb from "./img/lightBulb.svg";
import MainDiaryBoard from "./containers/MainDiaryBoard/MainDiaryBoard";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <img src={lightBulb} alt="toMainPage" className={styles.img} />
        <div className={styles.main_container}>
          <div>
            <MainDiaryBoard />
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default connect()(App);
