import React from "react";
import Menu from "./hoc/Menu/Menu";
import Diary from "./pages/Diary/Diary";
import Auth from "./pages/Auth/Auth";
import Main from "./pages/Main/Main";
import Logout from "./hoc/Logout/Logout";
import InfoModal from "./hoc/InfoModal/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { autoLogin } from "./store/Auth/autoLogin";
import { loadMainFoodCatalog } from "./store/FoodCatalog/loadMainFoodCatalog";
import { loadUserFoodCatalog } from "./store/FoodCatalog/loadUserFoodCatalog";
import { loadUserDiary } from "./store/Diary/loadUserDiary";

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
        <Route exact path="/FoodDiary" element={<Main />} />

        {isLogged ? (
          <>
            <Route
              path="/FoodDiary/auth"
              element={<Navigate replace to="/FoodDiary/diary" />}
            />
            <Route path="/FoodDiary/diary" element={<Diary />}></Route>
            <Route path="/FoodDiary/logout" element={<Logout />} />
          </>
        ) : (
          <>
            <Route path="/FoodDiary/auth" element={<Auth />}></Route>
            <Route
              path="/FoodDiary/diary"
              element={<Navigate replace to="/FoodDiary/auth" />}
            />
            <Route
              path="/FoodDiary/logout"
              element={<Navigate replace to="/FoodDiary/" />}
            />
          </>
        )}
      </Routes>

      <InfoModal />
    </React.Fragment>
  );
};

export default App;
