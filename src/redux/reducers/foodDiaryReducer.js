import { ADD_DISH_TO_DIARY, ADD_DAY_TO_DIARY } from "../actions/foodDiaryActionCreators";
import { LOAD_USER_DIARY } from "../actions/actionTypes";

const initialState = {
  /* [new Date(2019, 1, 21).toDateString()]: {
    dishes: [
      {
        dishName: "Періжок",
        dishWeight: 150,
        kkal: 100,
        proteins: 18,
        fats: 10,
        carbohydrates: 40
      },
      {
        dishName: "Суп",
        dishWeight: 100,
        kkal: 100,
        proteins: 18,
        fats: 10,
        carbohydrates: 40
      }
    ],
    showDishesList: false
  },
  [new Date(2019, 1, 20).toDateString()]: {
    dishes: [
      {
        dishName: "Гречка",
        dishWeight: 350,
        kkal: 200,
        proteins: 218,
        fats: 210,
        carbohydrates: 240
      },
      {
        dishName: "Картопля",
        dishWeight: 120,
        kkal: 100,
        proteins: 18,
        fats: 10,
        carbohydrates: 40
      }
    ],
    showDishesList: false
  },
  [new Date(2019, 1, 19).toDateString()]: {
    dishes: [
      {
        dishName: "Гречка",
        dishWeight: 350,
        kkal: 100,
        proteins: 18,
        fats: 10,
        carbohydrates: 40
      },
      {
        dishName: "Картопля",
        dishWeight: 120,
        kkal: 100,
        proteins: 18,
        fats: 10,
        carbohydrates: 40
      }
    ],
    showDishesList: false
  }*/
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case LOAD_USER_DIARY:
      return {
        ...actions.userDiary
      };
    case ADD_DISH_TO_DIARY:
      return {
        ...state,
        [actions.dateNow]: {
          dishes: [...state[actions.dateNow].dishes, actions.dishProps],
          showDishesList: false
        }
      };
    case ADD_DAY_TO_DIARY:
      return {
        ...state,
        [actions.date]: {
          dishes: [],
          showDishesList: false
        }
      };
    default:
      return state;
  }
}
