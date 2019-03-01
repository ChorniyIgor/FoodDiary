import React from "react";
import classes from "./Auth.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import is from "is_js";
import Firebase from "../../Firebase";

class Auth extends React.Component {
  state = {
    login: null,
    isLoginInCorrect: true,
    isLoginInputChange: false,
    pass: null,
    isPassInputChange: false,
    isPassInCorrect: false
  };

  onChangeLoginHendler = evt => {
    evt.preventDefault();
    this.setState({
      ...this.state,
      login: evt.target.value,
      isLoginInputChange: true,
      isLoginInCorrect: !is.email(evt.target.value)
    });
  };

  onChangePassHendler = evt => {
    evt.preventDefault();
    this.setState({
      ...this.state,
      pass: evt.target.value,
      isPassInputChange: true,
      isPassInCorrect: evt.target.value.length < 6
    });
  };

  onFormSubmitHendler = evt => {
    evt.preventDefault();
    console.log("submit");
  };

  onSighUpBtnClickHendler = async evt => {
    evt.preventDefault();
    const res = await Firebase.newUserReg(this.state.login, this.state.pass);
    console.log(res.localId);
  };

  onSighInBtnClickHendler = async evt => {
    evt.preventDefault();
    const res = await Firebase.userLogin(this.state.login, this.state.pass);
    console.log(res.localId);
  };

  render() {
    return (
      <div className={classes.Auth}>
        <h1 style={{ textAlign: "center" }}>Авторизація</h1>
        <form onSubmit={this.onFormSubmitHendler} className={classes.Form}>
          <Input
            labelText="Логін"
            onInput={this.onChangeLoginHendler}
            isRequired={true}
            isInputInCorrect={this.state.isLoginInputChange ? this.state.isLoginInCorrect : false}
            errorMsg="Невірний e-mail"
          />
          <Input
            labelText="Пароль"
            onInput={this.onChangePassHendler}
            isInputInCorrect={this.state.isPassInputChange ? this.state.isPassInCorrect : false}
            errorMsg="Пароль повинен складатись мінімум із 6 символів"
            isRequired={true}
          />
          <div className={classes.FormBtnContainer}>
            <Button
              type="submit"
              text="Увійти"
              color="blue"
              onClick={this.onSighInBtnClickHendler}
            />
            <Button
              type="submit"
              text="Зареєструватися"
              color="green"
              onClick={this.onSighUpBtnClickHendler}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
