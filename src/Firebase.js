class Firebase {
  constructor() {
    this.mainFoodCatalogUrl = `https://fooddiary-9cfea.firebaseio.com/MainDishes.json`;
    this.userFoodCatalogUrl = `https://fooddiary-9cfea.firebaseio.com/UserDishes.json`;
    this.userDiaryUrl = `https://fooddiary-9cfea.firebaseio.com/Diary.json`;
  }

  async getMainFoodCatalog() {
    const resp = await fetch(this.mainFoodCatalogUrl).then(resp => resp.json());
    return resp;
  }

  async getUserFoodCatalog() {
    const resp = await fetch(this.userFoodCatalogUrl).then(resp => resp.json());
    return resp;
  }

  async getUserDiary() {
    const resp = await fetch(this.userDiaryUrl).then(resp => resp.json());
    return resp;
  }

  async sendNewDish(val) {
    const options = {
      method: "POST",
      body: JSON.stringify(val)
    };
    const resp = await fetch(this.userFoodCatalogUrl, options).then(resp => resp.json());
    return resp;
  }
}

const base = new Firebase();
export default base;
