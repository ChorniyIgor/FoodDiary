import React from "react";
import Menu from "./hoc/Menu/Menu";
import Diary from "./pages/Diary/Diary";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import Logout from "./hoc/Logout/Logout";

// import { Route } from "react-router";
import InfoModal from "./hoc/InfoModal/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { autoLogin } from "./store/Auth/autoLogin";
import {
  loadMainFoodCatalog,
  loadUserFoodCatalog,
} from "./store/FoodCatalog/FoodCatalogSlice";
import { loadUserDiary } from "./store/Diary/DiarySlice";

const App = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.Auth.isLogged);

  useEffect(() => {
    if (isLogged) {
      dispatch(loadMainFoodCatalog());
      dispatch(loadUserFoodCatalog());
      dispatch(loadUserDiary());
    } else {
      dispatch(autoLogin());
    }
  }, [dispatch, isLogged]);

  return (
    <React.Fragment>
      <Menu />
      <Routes>
        <Route exact path="/" element={<Main />} />

        {isLogged ? (
          <>
            <Route path="/auth" element={<Navigate replace to="/diary" />} />
            <Route path="/diary" element={<Diary />}></Route>
            <Route path="/logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route path="/auth" element={<Auth />}></Route>
            <Route path="/diary" element={<Navigate replace to="/auth" />} />
            <Route path="/logout" element={<Navigate replace to="/" />} />
          </>
        )}
      </Routes>

      <InfoModal />
    </React.Fragment>
  );
};

export default App;
