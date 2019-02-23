import { ADD_DISH_TO_DIARY } from "../actions/foodDiaryActionCreators";

const initialState = {
  [new Date().toDateString()]: {
    dishes: [
      {
        dishName: "Періжок",
        dishWeight: 150
      },
      {
        dishName: "Суп",
        dishWeight: 100
      }
    ],
    showDishesList: false
  },
  [new Date(2019, 1, 20).toDateString()]: {
    dishes: [
      {
        dishName: "Гречка",
        dishWeight: 350
      },
      {
        dishName: "Картопля",
        dishWeight: 120
      }
    ],
    showDishesList: false
  },
  [new Date(2019, 1, 19).toDateString()]: {
    dishes: [
      {
        dishName: "Гречка",
        dishWeight: 350
      },
      {
        dishName: "Картопля",
        dishWeight: 120
      }
    ],
    showDishesList: false
  }
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case ADD_DISH_TO_DIARY:
      return {
        ...state
      };
    default:
      return state;
  }
}
