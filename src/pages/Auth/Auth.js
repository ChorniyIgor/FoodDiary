import classes from "./Auth.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import is from "is_js";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/Auth/signIn";
import { signUp } from "../../store/Auth/signUp";
import useInput from "../../hooks/useInput";

const isPassCorrect = (val) => val.length > 5;

const Auth = () => {
  const dispatch = useDispatch();

  const onFormSubmitHendler = (evt) => {
    evt.preventDefault();
  };

  const {
    inputValue: loginInputValue,
    isInputValid: isLoginInputValid,
    isErrorShown: isLoginInputErrorShown,
    onInputChangeHandler: onLoginInputChangeHandler,
    onInputBlurHandler: onLoginInputBlurHandler,
  } = useInput(is.email);

  const {
    inputValue: passInputValue,
    isInputValid: isPassInputValid,
    isErrorShown: isPassInputErrorShown,
    onInputChangeHandler: onPassInputChangeHandler,
    onInputBlurHandler: onPassInputBlurHandler,
  } = useInput(isPassCorrect);

  const onSighInBtnClickHendler = (evt) => {
    evt.preventDefault();
    if (isLoginInputValid && isPassInputValid) {
      dispatch(signIn({ login: loginInputValue, pass: passInputValue }));
    }
  };

  const onSighUpBtnClickHendler = (evt) => {
    evt.preventDefault();
    if (isLoginInputValid && isPassInputValid) {
      dispatch(signUp({ login: loginInputValue, pass: passInputValue }));
    }
  };

  return (
    <div className={classes.Auth}>
      <div className={classes.AuthContainer}>
        <form onSubmit={onFormSubmitHendler} className={classes.Form}>
          <Input
            labelText="Email"
            isRequired={true}
            isInputInCorrect={isLoginInputErrorShown}
            errorMsg="Invalid e-mail"
            type="email"
            value={loginInputValue}
            onChange={onLoginInputChangeHandler}
            onBlur={onLoginInputBlurHandler}
          />

          <Input
            labelText="Password"
            isInputInCorrect={isPassInputErrorShown}
            errorMsg="Password too short"
            isRequired={true}
            type="text"
            value={passInputValue}
            onChange={onPassInputChangeHandler}
            onBlur={onPassInputBlurHandler}
          />
          <div className={classes.FormBtnContainer}>
            <Button
              type="submit"
              text="Sign In"
              color="green"
              onClick={onSighInBtnClickHendler}
            />
            <Button
              type="submit"
              text="Register"
              color="blue"
              onClick={onSighUpBtnClickHendler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
