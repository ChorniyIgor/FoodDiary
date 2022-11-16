import React, { Component } from "react";
import Menu from "./hoc/Menu/Menu";
import Diary from "./pages/Diary/Diary";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import Logout from "./hoc/Logout/Logout";

// import { Route } from "react-router";
import InfoModal from "./hoc/InfoModal/InfoModal";
import { connect } from "react-redux";
import { autoLogin } from "./redux/AuthPage/actions";
import { Routes, Route } from "react-router-dom";

class App extends Component {
  componentWillMount = () => {
    this.props.autoLogin();
  };
  render() {
    return (
      <React.Fragment>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
        </Routes>

        {/* <Route path="/" exact component={Main} />
        {this.props.isLogged ? null : <Route path="/auth" component={Auth} />}
        {this.props.isLogged ? <Route path="/diary" component={Diary} /> : null}
        {this.props.isLogged ? (
          <Route path="/logout" component={Logout} />
        ) : null}
        <Route to="/" /> */}

        <InfoModal />
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLogged: state.Auth.isLogged,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => {
      dispatch(autoLogin());
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
