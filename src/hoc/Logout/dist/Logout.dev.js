"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

var _actions = require("../../redux/AuthPage/actions");

var _react = require("react");

var Logout = function Logout() {
  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(function () {
    dispatch((0, _actions.logout)());
  });
  return null;
};

var _default = Logout;
exports["default"] = _default;