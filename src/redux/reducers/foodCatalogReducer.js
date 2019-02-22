import { FOODSERCH } from "../actions/actionTypes";

const initialState = {
  dishes: ["Арахіс", "Борщ", "Кукурудза", "Каша", "Суп", "Овочі", "Помідори", "Яблука"],
  serchVal: []
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    case FOODSERCH:
      return {
        ...state,
        serchVal: actions.serchDish
      };
    default:
      return state;
  }
}
