import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { appLogout } from "../../store/Auth/appLogout";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appLogout());
  });
  return null;
};

export default Logout;
