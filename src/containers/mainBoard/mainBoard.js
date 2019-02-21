import React from "react";
import { connect } from "react-redux";

const MainBoard = props => {
  return (
    <section>
      <h2>Board</h2>
      <p>{props.test}</p>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    test: state.testReducer.test
  };
}

export default connect(mapStateToProps)(MainBoard);
