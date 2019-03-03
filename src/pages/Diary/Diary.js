import React, { Component } from "react";
import styles from "./Diary.css";
import { connect } from "react-redux";
import MainDiaryBoard from "./containers/MainDiaryBoard/MainDiaryBoard";
import FoodCatalog from "./containers/FoodCatalog/FoodCataloge";
import {
  loadMainFoodCatalog,
  loadUserFoodCatalog
} from "../../redux/DiaryPage/actions/foodCatalogActionCreators";
import { loadUserDiary } from "../../redux/DiaryPage/actions/foodDiaryActionCreators";

class Diary extends Component {
  componentWillMount() {
    this.props.loadMainFoodCatalog();
    this.props.loadUserFoodCatalog();
    this.props.loadUserDiary();
  }
  render() {
    return (
      <div className={styles.App}>
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
)(Diary);
