import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/AuthPage/actions";

class Logout extends React.Component {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);
