import React, { Component } from "react";
import Menu from "./hoc/Menu/Menu";
import Diary from "./pages/Diary/Diary";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import Logout from "./hoc/Logout/Logout";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import InfoModal from "./hoc/InfoModal/InfoModal";
import { connect } from "react-redux";
import { autoLogin } from "./redux/AuthPage/actions";

class App extends Component {
  componentWillMount = () => {
    this.props.autoLogin();
  };
  render() {
    return (
      <React.Fragment>
        <Menu />

        <Switch>
          <Route path="/" exact component={Main} />
          {this.props.isLogged ? null : <Route path="/auth" component={Auth} />}
          {this.props.isLogged ? <Route path="/diary" component={Diary} /> : null}
          {this.props.isLogged ? <Route path="/logout" component={Logout} /> : null}
          <Redirect to="/" />
        </Switch>
        <InfoModal />
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLogged: state.Auth.isLogged
  };
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => {
      dispatch(autoLogin());
    }
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
