import React from "react";
import { connect } from "react-redux";
import DiaryDayItem from "../../components/DiaryDayItem/DiaryDayItem";
import styles from "./MainDiaryBoard.css";

const MainBoard = props => {
  console.log(props.foodDiary);
  return (
    <section>
      <h2>Board</h2>
      <ul className={styles.DiaryBoardList}>
        {Object.keys(props.foodDiary).map((key, index) => {
          const diaryList = props.foodDiary[key];
          return <DiaryDayItem key={index} foodList={diaryList.dishes} dateOfList={key} />;
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
