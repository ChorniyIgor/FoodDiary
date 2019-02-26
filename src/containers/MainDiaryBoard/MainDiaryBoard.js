import React from "react";
import { connect } from "react-redux";
import DiaryDayItem from "../../components/DiaryDayItem/DiaryDayItem";
import styles from "./MainDiaryBoard.css";

const MainBoard = props => {
  function getDaySortArray(foodDiary) {
    return foodDiary.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  return (
    <section>
      <h2>Щоденник</h2>
      <ul className={styles.DiaryBoardList}>
        {getDaySortArray(props.foodDiary).map((item, index) => {
          const date = item.date;
          const foodList = item.dishes;
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
