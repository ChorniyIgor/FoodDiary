import React from "react";
import { connect } from "react-redux";
import DiaryDayItem from "../DiaryDayItem/DiaryDayItem";

const MainBoard = props => {
  console.log(props);
  return (
    <section>
      <h2>Board</h2>
      <ul>
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
