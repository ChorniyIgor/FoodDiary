import { FOOD_SERCH, ADD_USER_DISH } from "../actions/actionTypes";

const initialState = {
  dishes: ["Арахіс", "Борщ", "Кукурудза", "Каша", "Суп", "Овочі", "Помідори", "Яблука"],
  userDishes: [],
  serchVal: []
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case FOOD_SERCH:
      return {
        ...state,
        serchVal: actions.serchDish
      };
    case ADD_USER_DISH:
      return {
        ...state,
        userDishes: [...state.userDishes, actions.dishName]
      };
    default:
      return state;
  }
  
}
