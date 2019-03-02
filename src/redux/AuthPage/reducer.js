import { LOGIN_IN, LOGOUT } from "./actions";

const initialState = {
  userId: null,
  isLogged: false
};

export default function App(state = initialState, actions) {
  switch (actions.type) {
    case LOGIN_IN:
      return {
        ...state,
        isLogged: true,
        userId: actions.userId
      };
    case LOGOUT:
      return {
        ...state,
        isLogged: false,
        userId: null
      };
    default:
      return state;
  }
}
