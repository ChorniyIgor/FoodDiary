import React from "react";
import classes from "./FoodCatalogList.css";
import CatalogListItem from "./CatalogListItem/CatalogListItem";

const FoodCatalogList = props => {
  function getSerchResultList(serchRes) {
    if (serchRes.length === 0) return <p>Збігів не знайдено</p>;
    else
      return serchRes.map((item, index) => {
        return <CatalogListItem key={index} item={item} />;
      });
  }
  return <ul className={classes.FoodList}>{getSerchResultList(props.serchRes)}</ul>;
};

export default FoodCatalogList;
