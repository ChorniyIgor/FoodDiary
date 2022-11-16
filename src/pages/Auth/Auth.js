import React, { useState } from "react";
import classes from "./Auth.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import is from "is_js";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/Auth/signIn";
import { signUp } from "../../store/Auth/signUp";

const Auth = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    login: null,
    isLoginIncorrect: true,
    isLoginInputChange: false,
    pass: null,
    isPassInputChange: false,
    isPassIncorrect: true,
  });

  const onChangeLoginHendler = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      login: evt.target.value,
      isLoginInputChange: true,
      isLoginIncorrect: !is.email(evt.target.value),
    });
  };

  const onChangePassHendler = (evt) => {
    evt.preventDefault();
    setState({
      ...state,
      pass: evt.target.value,
      isPassInputChange: true,
      isPassIncorrect: evt.target.value.length < 6,
    });
  };

  const onFormSubmitHendler = (evt) => {
    evt.preventDefault();
  };

  const onSighUpBtnClickHendler = (evt) => {
    evt.preventDefault();
    if (!state.isLoginIncorrect && !state.isPassIncorrect) {
      dispatch(signUp({ login: state.login, pass: state.pass }));
    }
  };

  const onSighInBtnClickHendler = (evt) => {
    evt.preventDefault();
    if (!state.isLoginIncorrect && !state.isPassIncorrect) {
      dispatch(signIn({ login: state.login, pass: state.pass }));
    }
  };

  return (
    <div className={classes.Auth}>
      <h1 style={{ textAlign: "center" }}>Авторизація</h1>
      <form onSubmit={onFormSubmitHendler} className={classes.Form}>
        <Input
          labelText="Логін"
          onInput={onChangeLoginHendler}
          isRequired={true}
          isInputInCorrect={
            state.isLoginInputChange ? state.isLoginIncorrect : false
          }
          errorMsg="Невірний e-mail"
        />

        <Input
          labelText="Пароль"
          onInput={onChangePassHendler}
          isInputInCorrect={
            state.isPassInputChange ? state.isPassIncorrect : false
          }
          errorMsg="Пароль повинен складатись мінімум із 6 символів"
          isRequired={true}
        />
        <div className={classes.FormBtnContainer}>
          <Button
            type="submit"
            text="Увійти"
            color="green"
            onClick={onSighInBtnClickHendler}
          />
          <Button
            type="submit"
            text="Зареєструватися"
            color="blue"
            onClick={onSighUpBtnClickHendler}
          />
        </div>
      </form>
    </div>
  );
};

export default Auth;
