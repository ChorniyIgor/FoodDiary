import React from "react";
import DishesListItem from "../../containers/DishesListItem/DishesListItem";
import styles from "./DiaryDayItem.css";

class DiaryItem extends React.Component {
  state = {
    showDishesList: false
  };

  onDayToggleClick = () => {
    this.setState({
      showDishesList: !this.state.showDishesList
    });
  };

  dishesList = dishes => {
    const cls = [styles.DishList];
    this.state.showDishesList ? cls.push(styles.DishListOpen) : cls.push(styles.DishListHide);
    return (
      <ul className={cls.join(" ")}>
        {dishes.map((dish, i) => {
          return <DishesListItem dish={dish} key={i} />;
        })}
      </ul>
    );
  };

  render() {
    const cls = [styles.DayToggle];
    this.state.showDishesList ? cls.push(styles.DayToggleOpen) : cls.push();
    return (
      <li className={styles.DayItem}>
        <button onClick={this.onDayToggleClick} className={cls.join(" ")}>
          {this.props.dateOfList}
        </button>
        {this.dishesList(this.props.foodList)}
      </li>
    );
  }
}

export default DiaryItem;
