export const calculateDishParam = (dishProps) => {
  const dishWeight = dishProps.dishWeight / 100;
  const newdishProps = {
    dishName: dishProps.dishName,
    dishWeight: dishProps.dishWeight.toFixed(2),
    kkal: (parseFloat(dishProps.kkal) * dishWeight).toFixed(2),
    proteins: (parseFloat(dishProps.proteins) * dishWeight).toFixed(2),
    fats: (parseFloat(dishProps.fats) * dishWeight).toFixed(2),
    carbohydrates: (parseFloat(dishProps.carbohydrates) * dishWeight).toFixed(
      2
    ),
  };
  return newdishProps;
};
