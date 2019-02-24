export const ADD_DISH_TO_DIARY = "ADD_DISH_TO_DIARY";
export const ADD_DAY_TO_DIARY = "ADD_DAY_TO_DIARY";

export function addDishToDiary(dishProps) {
  return (dispatch, getState) => {
    const foodDiary = getState().foodDiary;
    const date = new Date().toDateString();

    if (!foodDiary[date]) {
      dispatch(addDayToDiary(date));
    }

    dispatch({
      type: ADD_DISH_TO_DIARY,
      dishProps,
      dateNow: new Date().toDateString()
    });
  };
}

export function addDayToDiary(date) {
  return {
    type: ADD_DAY_TO_DIARY,
    date
  };
}
