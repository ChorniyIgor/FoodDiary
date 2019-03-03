import React from "react";
import classes from "./Auth.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import is from "is_js";
import { connect } from "react-redux";
import { signUp, signIn } from "../../redux/AuthPage/actions";
import { showMsg } from "../../redux/Modal/modalActionCreators";

class Auth extends React.Component {
  state = {
    login: null,
    isLoginIncorrect: true,
    isLoginInputChange: false,
    pass: null,
    isPassInputChange: false,
    isPassIncorrect: true
  };

  onChangeLoginHendler = evt => {
    evt.preventDefault();
    this.setState({
      ...this.state,
      login: evt.target.value,
      isLoginInputChange: true,
      isLoginIncorrect: !is.email(evt.target.value)
    });
  };

  onChangePassHendler = evt => {
    evt.preventDefault();
    this.setState({
      ...this.state,
      pass: evt.target.value,
      isPassInputChange: true,
      isPassIncorrect: evt.target.value.length < 6
    });
  };

  onFormSubmitHendler = evt => {
    evt.preventDefault();
  };

  onSighUpBtnClickHendler = evt => {
    evt.preventDefault();
    if (!this.state.isLoginIncorrect && !this.state.isPassIncorrect) {
      this.props.signUp(this.state.login, this.state.pass);
    }
  };

  onSighInBtnClickHendler = evt => {
    evt.preventDefault();
    if (!this.state.isLoginIncorrect && !this.state.isPassIncorrect) {
      this.props.signIn(this.state.login, this.state.pass);
    }
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
            isInputInCorrect={this.state.isLoginInputChange ? this.state.isLoginIncorrect : false}
            errorMsg="Невірний e-mail"
          />

          <Input
            labelText="Пароль"
            onInput={this.onChangePassHendler}
            isInputInCorrect={this.state.isPassInputChange ? this.state.isPassIncorrect : false}
            errorMsg="Пароль повинен складатись мінімум із 6 символів"
            isRequired={true}
          />
          <div className={classes.FormBtnContainer}>
            <Button
              type="submit"
              text="Увійти"
              color="green"
              onClick={this.onSighInBtnClickHendler}
            />
            <Button
              type="submit"
              text="Зареєструватися"
              color="blue"
              onClick={this.onSighUpBtnClickHendler}
            />
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: (email, pass) => {
      dispatch(signUp(email, pass));
    },
    signIn: (email, pass) => {
      dispatch(signIn(email, pass));
    },
    showMsg: (msgType, msg) => {
      dispatch(showMsg(msgType, msg));
    }
  };
}
export default connect(
  null,
  mapDispatchToProps
)(Auth);
