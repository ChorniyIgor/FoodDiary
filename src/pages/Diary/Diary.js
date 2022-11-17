import React, { useEffect } from "react";
import styles from "./Diary.module.css";
import { useDispatch, useSelector } from "react-redux";
import MainDiaryBoard from "./containers/MainDiaryBoard/MainDiaryBoard";
import FoodCatalog from "./containers/FoodCatalog/FoodCataloge";
import {
  loadMainFoodCatalog,
  loadUserFoodCatalog,
} from "../../store/FoodCatalog/FoodCatalogSlice";
import { loadUserDiary } from "../../store/Diary/DiarySlice";
import Preloader from "../../hoc/Preloader/Preloader";

const Diary = () => {
  const dispatch = useDispatch();

  const foodDiary = useSelector((state) => state.foodDiary);
  const foodCatalog = useSelector((state) => state.foodCatalog);
  const isDataLoading =
    foodDiary.diaryIsLoading &&
    foodCatalog.userDishesIsLoading &&
    foodCatalog.mainDishesIsLoading;

  useEffect(() => {
    dispatch(loadMainFoodCatalog());
    dispatch(loadUserFoodCatalog());
    dispatch(loadUserDiary());
  }, [dispatch]);

  return isDataLoading ? (
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
};

export default Diary;
