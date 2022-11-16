import { useDispatch } from "react-redux";
import { logout } from "../../redux/AuthPage/actions";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  });
  return null;
};

export default Logout;
