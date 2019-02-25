import React, { Component } from "react";
import styles from "./App.css";
import { connect } from "react-redux";
import lightBulb from "./img/lightBulb.svg";
import MainDiaryBoard from "./containers/MainDiaryBoard/MainDiaryBoard";
import FoodCatalog from "./containers/FoodCatalog/FoodCataloge";
import {
  loadMainFoodCatalog,
  loadUserFoodCatalog
} from "./redux/actions/foodCatalogActionCreators";
import { loadUserDiary } from "./redux/actions/foodDiaryActionCreators";

class App extends Component {
  componentWillMount() {
    this.props.loadMainFoodCatalog();
    this.props.loadUserFoodCatalog();
    this.props.loadUserDiary();
  }
  render() {
    return (
      <div className={styles.App}>
        <img src={lightBulb} alt="toMainPage" className={styles.img} />
        <div className={styles.main_container}>
          <div>
            <FoodCatalog />
          </div>
          <div>
            <MainDiaryBoard />
          </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadMainFoodCatalog: () => {
      dispatch(loadMainFoodCatalog());
    },
    loadUserFoodCatalog: () => {
      dispatch(loadUserFoodCatalog());
    },
    loadUserDiary: () => {
      dispatch(loadUserDiary());
    }
  };
}
export default connect(
  null,
  mapDispatchToProps
)(App);
