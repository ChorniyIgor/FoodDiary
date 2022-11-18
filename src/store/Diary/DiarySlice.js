import { createSlice } from "@reduxjs/toolkit";
import DataAdapter from "../../dataAdapter";
import Firebase from "../../Firebase";
import { showMsg } from "../Modal/ModalSlice";

const initialState = {
  diary: [],
  diaryIsLoading: false,
};

const diarySlice = createSlice({
  name: "@@diary",
  initialState: initialState,
  reducers: {
    loadUserDiary: (state, action) => {
      state.diary = action.payload;
      state.diaryIsLoading = true;
    },
    addDishToDiary: (state, action) => {
      const newState = [];
      state.diary.forEach((el) => {
        if (el.date !== action.payload.dateNow) {
          newState.push(el);
        } else {
          newState.push({
            ...el,
            dishes: [...el.dishes, action.payload.dishProps],
          });
        }
      });

      state.diary = newState;
    },
    addDayToDiary: (state, action) => {
      state.diary.push({
        dishes: [],
        showDishesList: false,
        key: action.payload.key,
        date: action.payload.date,
      });
    },
    editDishInDiary: (state, action) => {
      const newStateList = [...state.diary];
      newStateList.forEach((dayItem) => {
        if (dayItem.key === action.payload.dishInfo.keyOfList) {
          dayItem.dishes.forEach((dish, index) => {
            if (dish.key === action.payload.dishInfo.key) {
              dayItem.dishes[index] = action.payload.dishInfo;
            }
          });
        }
      });

      state.diary = newStateList;
    },
    deleteDishFromDiary: (state, action) => {
      const newDayState = [...state.diary];
      newDayState.forEach((dayItem) => {
        if (dayItem.key === action.payload.listKey) {
          dayItem.dishes.forEach((dish, index) => {
            if (dish.key === action.payload.dishKey) {
              dayItem.dishes.splice(index, 1);
            }
          });
        }
      });
      state.diary = newDayState;
    },
  },
});

export const {
  loadUserDiary: loadDiary,
  addDishToDiary: addDish,
  addDayToDiary,
  editDishInDiary: editDish,
  deleteDishFromDiary: deleteDish,
} = diarySlice.actions;

export const loadUserDiary = () => {
  return async (dispatch, getState) => {
    const state = getState();
    if (!state.Auth.isLogged) return;
    try {
      const userDiary = await Firebase.getUserDiary(state.Auth.userId);
      const adaptedData = DataAdapter.userDiary(userDiary);
      dispatch(loadDiary(adaptedData));
    } catch (e) {
      console.log("loadUserFoodCatalog error", e);
      dispatch(
        showMsg("error", "Щось пішло не так, спробуйте оновити сторінку")
      );
    }
  };
};

function getDayElementByDate(diary, date) {
  return (
    diary.filter((el) => {
      return el.date === date;
    })[0] || []
  );
}

function calculateDishParam(dishProps) {
  const dishWeight = dishProps.dishWeight / 100;
  const newdishProps = {
    dishName: dishProps.dishName,
    dishWeight: dishProps.dishWeight.toFixed(2),
    kkal: (parseFloat(dishProps.kkal) * dishWeight).toFixed(2),
    proteins: (parseFloat(dishProps.proteins) * dishWeight).toFixed(2),
    fats: (parseFloat(dishProps.fats) * dishWeight).toFixed(2),
    carbohydrates: (parseFloat(dishProps.carbohydrates) * dishWeight).toFixed(
      2
    ),
  };
  return newdishProps;
}

export const addDishToDiary = (dishProps) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const date = new Date().toDateString();
      const dayElement = getDayElementByDate(state.foodDiary.diary, date);
      let dayKey = "";
      if (Array.isArray(dayElement)) {
        const res = await Firebase.sendNewDay(date, state.Auth.userId);
        dayKey = res.name;
        dispatch(addDayToDiary({ date, dayKey }));
      } else {
        dayKey = dayElement.key;
      }
      const calcProps = calculateDishParam(dishProps);
      const dishKey = await Firebase.sendNewDishToDiary(
        calcProps,
        dayKey,
        date,
        state.Auth.userId
      );
      dispatch(
        addDish({
          day: dayElement,
          dishProps: { ...calcProps, key: dishKey.name },
          dateNow: new Date().toDateString(),
        })
      );
      dispatch(showMsg("success", "Запис успішно додано у ваш щоденник"));
    } catch {
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
};

export const editDishInDiary = (dishInfo) => {
  return async (dispatch, getState) => {
    const state = getState();
    const dishProps = calculateDishParam({
      ...dishInfo,
      ...dishInfo.dishPropsPer100g,
    });
    try {
      await Firebase.editDishInDiary(
        dishProps,
        dishInfo.key,
        dishInfo.keyOfList,
        dishInfo.dateOfList,
        state.Auth.userId
      );
      dispatch(
        editDish({
          dishInfo,
          ...calculateDishParam({ ...dishInfo, ...dishInfo.dishPropsPer100g }),
        })
      );
      dispatch(showMsg("success", "Запис у щоденнику успішно оновлено"));
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
};

export const deleteDishFromDiary = (props) => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      await Firebase.deleteDishFromDiary(
        props.dishKey,
        props.keyOfList,
        props.dateOfList,
        state.Auth.userId
      );
      dispatch(
        deleteDish({
          listKey: props.keyOfList,
          dishKey: props.dishKey,
        })
      );
      dispatch(showMsg("success", "Запис успішно видалено зі щоденника"));
    } catch (e) {
      console.log(e);
      dispatch(showMsg("error", "Щось пішло не так, спробуйте ще раз"));
    }
  };
};

export const DiaryReducer = diarySlice.reducer;
