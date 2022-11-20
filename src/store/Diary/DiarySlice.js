import { createSlice } from "@reduxjs/toolkit";

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
      state.diary.forEach((dayItem) => {
        if (dayItem.key === action.payload.dishInfo.keyOfList) {
          dayItem.dishes.forEach((dish, index) => {
            if (dish.key === action.payload.dishInfo.key) {
              dayItem.dishes[index] = action.payload.dishInfo;
            }
          });
        }
      });
    },
    deleteDishFromDiary: (state, action) => {
      state.diary.forEach((dayItem) => {
        if (dayItem.key === action.payload.listKey) {
          dayItem.dishes.forEach((dish, index) => {
            if (dish.key === action.payload.dishKey) {
              dayItem.dishes.splice(index, 1);
            }
          });
        }
      });
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

export const DiaryReducer = diarySlice.reducer;
