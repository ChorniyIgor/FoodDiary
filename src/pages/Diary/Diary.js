import React, { Component } from "react";
import styles from "./Diary.module.css";
import { connect } from "react-redux";
import MainDiaryBoard from "./containers/MainDiaryBoard/MainDiaryBoard";
import FoodCatalog from "./containers/FoodCatalog/FoodCataloge";
import {
  loadMainFoodCatalog,
  loadUserFoodCatalog,
} from "../../redux/DiaryPage/actions/foodCatalogActionCreators";
import { loadUserDiary } from "../../redux/DiaryPage/actions/foodDiaryActionCreators";
import Preloader from "../../hoc/Preloader/Preloader";

class Diary extends Component {
  async componentWillMount() {
    this.props.loadMainFoodCatalog();
    this.props.loadUserFoodCatalog();
    this.props.loadUserDiary();
  }
  render() {
    return this.props.isDataLoading ? (
      <div className={[styles.App].join(" ")}>
        <div className={styles.main_container}>
          <div>
            <FoodCatalog />
          </div>
          <div>
            <MainDiaryBoard />
          </div>
        </div>
      </div>
    ) : (
      <Preloader />
    );
  }
}
function mapStateToProps(state) {
  return {
    isDataLoading:
      state.foodDiary.diaryIsLoading &&
      state.foodCatalog.userDishesIsLoading &&
      state.foodCatalog.mainDishesIsLoading,
  };
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
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Diary);
