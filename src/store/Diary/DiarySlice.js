import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const diaryDaysAdapter = createEntityAdapter({
  initialState: [],
  selectId: (diaryDay) => diaryDay.key,
});

const initialState = {
  diary: diaryDaysAdapter.getInitialState(),
  diaryIsLoading: false,
};

const diarySlice = createSlice({
  name: "@@diary",
  initialState: initialState,
  reducers: {
    loadUserDiary: (state, action) => {
      diaryDaysAdapter.setAll(state.diary, action.payload);
      state.diaryIsLoading = true;
    },
    addDishToDiary: (state, action) => {
      diaryDaysAdapter.updateOne(state.diary, {
        id: action.payload.day.key,
        changes: {
          dishes: [...action.payload.day.dishes, action.payload.dishProps],
        },
      });
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
      diaryDaysAdapter.updateOne(state.diary, {
        id: action.payload.dishInfo.keyOfList,
        changes: {
          dishes: action.payload.modificatedDishList,
        },
      });
    },
    deleteDishFromDiary: (state, action) => {
      diaryDaysAdapter.updateOne(state.diary, {
        id: action.payload.listKey,
        changes: {
          dishes: action.payload.newDishList,
        },
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

export const DiaryDaysSelector = diaryDaysAdapter.getSelectors(
  (state) => state.foodDiary.diary
);
