import React, { Component } from "react";
import styles from "./App.css";
import { connect } from "react-redux";
import lightBulb from "./img/lightBulb.svg";
import MainDiaryBoard from "./containers/MainDiaryBoard/MainDiaryBoard";
import FoodCatalog from "./containers/FoodCatalog/FoodCataloge";
import AddDishModall from "./containers/AddDishModal/AddDishModal";
import AddDishToDiaryModall from "./containers/AddDishToDiaryModal/AddDishToDiaryModal";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <img src={lightBulb} alt="toMainPage" className={styles.img} />
        <div className={styles.main_container}>
          <div>
            <MainDiaryBoard />
          </div>
          <div>
            <FoodCatalog />
          </div>
        </div>
        <AddDishModall />
        <AddDishToDiaryModall />
      </div>
    );
  }
}

export default connect()(App);
