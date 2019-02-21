import React, { Component } from "react";
import styles from "./App.css";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return <div className={styles.App} />;
  }
}

export default connect()(App);
