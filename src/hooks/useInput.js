import { useReducer } from "react";

const initialState = {
  inputValue: "",
  wasInputTouched: false,
};

const inputStateReducer = (prevState, action) => {
  if (action.type === "SET_INPUT_VALUE") {
    return {
      ...prevState,
      inputValue: action.value,
    };
  }
  if (action.type === "SET_INPUT_TOUCHED") {
    return {
      ...prevState,
      wasInputTouched: action.value,
    };
  }
  return prevState;
};

const useInput = (inputValidationFunc) => {
  const [inputState, dispatchInputState] = useReducer(
    inputStateReducer,
    initialState
  );

  const isInputValid = inputValidationFunc(inputState.inputValue);

  const isErrorShown = !isInputValid && inputState.wasInputTouched;

  const onInputChangeHandler = (evt) => {
    const value = evt.target.value.trim();
    dispatchInputState({
      type: "SET_INPUT_VALUE",
      value,
    });
  };

  const onInputBlurHandler = (evt) => {
    dispatchInputState({
      type: "SET_INPUT_TOUCHED",
      value: true,
    });
  };

  const resetInputHadler = () => {
    dispatchInputState({
      type: "SET_INPUT_VALUE",
      value: "",
    });
    dispatchInputState({
      type: "SET_INPUT_TOUCHED",
      value: false,
    });
  };

  return {
    inputValue: inputState.inputValue,
    isInputValid,
    isErrorShown,
    onInputChangeHandler,
    onInputBlurHandler,
    resetInputHadler,
  };
};

export default useInput;
