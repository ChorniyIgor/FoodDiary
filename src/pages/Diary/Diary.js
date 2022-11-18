import styles from "./Diary.module.css";
import { useSelector } from "react-redux";
import MainDiaryBoard from "./containers/MainDiaryBoard/MainDiaryBoard";
import FoodCatalog from "./containers/FoodCatalog/FoodCataloge";
import Preloader from "../../hoc/Preloader/Preloader";

const Diary = () => {
  const foodDiary = useSelector((state) => state.foodDiary);
  const foodCatalog = useSelector((state) => state.foodCatalog);
  const isDataLoading =
    foodDiary.diaryIsLoading &&
    foodCatalog.userDishesIsLoading &&
    foodCatalog.mainDishesIsLoading;

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
