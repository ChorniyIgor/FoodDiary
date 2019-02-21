const initialState = {
  [new Date().toDateString()]: {
    dishes: [
      {
        dishName: "Періжок",
        dishWeight: 150
      },
      {
        dishName: "Суп",
        dishWeight: 100
      }
    ]
  },
  [new Date(2019, 1, 20).toDateString()]: {
    dishes: [
      {
        dishName: "Гречка",
        dishWeight: 350
      },
      {
        dishName: "Картопля",
        dishWeight: 120
      }
    ]
  }
};

export default function(state = initialState, actions) {
  switch (actions.type) {
    default:
      return state;
  }
}
