import React from "react";
import { connect } from "react-redux";
import DiaryDayItem from "../../components/DiaryDayItem/DiaryDayItem";
import styles from "./MainDiaryBoard.css";

const MainBoard = props => {
  function getDayItems(foodDiary) {
    const foodDiaryHeaders = [];
    for (const key in foodDiary) {
      foodDiaryHeaders.push(foodDiary[key]);
    }
    return foodDiaryHeaders.sort((a, b) => {
      return new Date(Object.keys(b)[0]) - new Date(Object.keys(a)[0]);
    });
  }

  return (
    <section>
      <h2>Щоденник</h2>
      <ul className={styles.DiaryBoardList}>
        {getDayItems(props.foodDiary).map((item, index) => {
          const date = Object.keys(item)[0];
          const foodList = item[date].dishes;
          return <DiaryDayItem key={index} foodList={foodList} dateOfList={date} />;
        })}
      </ul>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    foodDiary: state.foodDiary
  };
}

export default connect(mapStateToProps)(MainBoard);
