export const calculateDishParam = (dishProps) => {
  const { dishWeight, dishNewWeight } = dishProps;

  if (!dishNewWeight) {
    return {
      dishName: dishProps.dishName,
      dishWeight: (+dishWeight).toFixed(2),
      kkal: ((parseFloat(dishProps.kkal) * dishWeight) / 100).toFixed(2),
      proteins: ((parseFloat(dishProps.proteins) * dishWeight) / 100).toFixed(
        2
      ),
      fats: ((parseFloat(dishProps.fats) * dishWeight) / 100).toFixed(2),
      carbohydrates: (
        (parseFloat(dishProps.carbohydrates) * dishWeight) /
        100
      ).toFixed(2),
    };
  }

  return {
    dishName: dishProps.dishName,
    dishWeight: (+dishNewWeight).toFixed(2),
    kkal: ((parseFloat(dishProps.kkal) / dishWeight) * dishNewWeight).toFixed(
      2
    ),
    proteins: (
      (parseFloat(dishProps.proteins) / dishWeight) *
      dishNewWeight
    ).toFixed(2),
    fats: ((parseFloat(dishProps.fats) / dishWeight) * dishNewWeight).toFixed(
      2
    ),
    carbohydrates: (
      (parseFloat(dishProps.carbohydrates) / dishWeight) *
      dishNewWeight
    ).toFixed(2),
  };
};
