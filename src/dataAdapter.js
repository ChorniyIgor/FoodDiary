export default function userDiaryDataAdapter(data) {
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
  console.log("newData", newData);
  return newData;
}
