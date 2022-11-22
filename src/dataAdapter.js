class DataAdapter {
  static userDiary(data) {
    let newData = [];

    for (const key in data) {
      const dayItem = data[key];
      const date = Object.keys(dayItem)[0];
      const dayInfo = dayItem[date];
      const dishes = dayInfo.dishes;

      const newDishesList = [];
      for (const dishesKey in dishes) {
        newDishesList.push({ ...dishes[dishesKey], key: dishesKey });
      }

      const newEl = { ...dayInfo, key, dishes: newDishesList, date };
      newData.push(newEl);
    }
    return newData;
  }

  static dishes(data, isUserDish = false) {
    let newData = {};
    for (const key in data) {
      const item = data[key];
      const itemName = Object.keys(item)[0];
      const itemInfo = item[itemName];

      function reduceNumber(numb) {
        if (numb.replace) {
          return parseFloat(numb.replace(",", ".")) || 0;
        } else return numb;
      }

      const newItemInfo = {
        carbohydrates: reduceNumber(itemInfo.carbohydrates),
        fats: reduceNumber(itemInfo.fats),
        kkal: reduceNumber(itemInfo.kkal),
        proteins: reduceNumber(itemInfo.proteins),
      };

      Object.assign(newData, {
        [key]: {
          ...newItemInfo,
          key,
          isUserDish,
          dishName: itemName.trim(),
        },
      });
    }

    return newData;
  }
}

export default DataAdapter;
