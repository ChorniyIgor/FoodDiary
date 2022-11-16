import React from "react";
import classes from "./Main.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  const isLogged = useSelector((state) => state.Auth.isLogged);
  return (
    <div className={classes.Main}>
      <div className={classes.Container}>
        <h1 className={classes.MainTitle}>Free Food Diary</h1>
        <h2>ваш персональний щоденник харчування</h2>
        <q>
          З тих пір, як люди навчилися варити їжу, вони їдять удвічі більше, ніж
          вимагає природа.
        </q>
        <cite> Б. Франклін;</cite>
        {isLogged ? (
          <NavLink to="/diary" className={classes.MainBtn}>
            Відкрити щоденник
          </NavLink>
        ) : (
          <NavLink to="/auth" className={classes.MainBtn}>
            Увійти / Зареєструватись
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Main;
