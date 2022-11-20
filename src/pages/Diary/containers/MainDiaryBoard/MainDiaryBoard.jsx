import React from "react";
import { useSelector } from "react-redux";
import DiaryDayItem from "../../components/DiaryDayItem/DiaryDayItem";
import styles from "./MainDiaryBoard.module.css";

const MainBoard = () => {
  const foodDiary = useSelector((state) => state.foodDiary.diary);

  let sortedByDateDiary = [...foodDiary].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <section className={styles.DiaryBoard}>
      <h2>Your Diary</h2>
      <ul className={styles.DiaryBoardList}>
        {sortedByDateDiary.map((item, index) => {
          const date = item.date;
          const foodList = item.dishes;
          const dayKey = item.key;
          return (
            <DiaryDayItem
              key={index}
              foodList={foodList}
              dateOfList={date}
              keyOfList={dayKey}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default MainBoard;