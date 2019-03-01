import React from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

class Auth extends React.Component {
  state = {
    login: null,
    pass: null
  };

  onChangeLoginHendler = evt => {
    evt.preventDefault();
    this.setState({
      ...this.state,
      login: evt.target.value
    });
  };

  onChangePassHendler = evt => {
    evt.preventDefault();
    this.setState({
      ...this.state,
      pass: evt.target.value
    });
  };

  onFormSubmitHendler = evt => {
    evt.preventDefault();
    console.log("submit");
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Auth</h1>
        <form onSubmit={this.onFormSubmitHendler}>
          <Input
            labelText="Логін"
            onInput={this.onChangeLoginHendler}
            //inputRefer={inputProteinsRef}
            isRequired={true}
          />
          <Input
            labelText="Пароль"
            onInput={this.onChangePassHendler}
            //inputRefer={inputProteinsRef}
            isRequired={true}
          />
          <Button type="submit" text="Зберегти" color="blue" />
        </form>
      </div>
    );
  }
}

export default Auth;
