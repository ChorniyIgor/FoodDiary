class Firebase {
  constructor() {
    this.mainFoodCatalogUrl = `https://fooddiary-9cfea.firebaseio.com/MainDishes.json`;
    this.userFoodCatalogUrl = `https://fooddiary-9cfea.firebaseio.com/UserDishes.json`;
    this.userDiaryUrl = `https://fooddiary-9cfea.firebaseio.com/Diary.json`;
    this.apiKey = "AIzaSyDusvIB2fy-VxeOK94Ar0NbQH6kzGe1zFg";
  }

  async userAuth(email, password, isLogin) {
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
      this.apiKey
    }`;
    if (isLogin) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
        this.apiKey
      }`;
    }

    const data = {
      email,
      password,
      returnSecureToken: true
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data)
    };
    try {
      const resp = await fetch(url, options);
      const result = await resp.json();

      if (resp.status === 200) {
        return result;
      } else {
        return result.error.message;
      }
    } catch (error) {
      throw new Error(error);
    }
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

  async sendNewDay(date) {
    const newServerData = {
      [date]: {
        dishes: [],
        showDishesList: false
      }
    };
    const options = {
      method: "POST",
      body: JSON.stringify(newServerData)
    };
    const resp = await fetch(this.userDiaryUrl, options).then(resp => resp.json());
    return resp;
  }

  async sendNewDishToDiary(value, dayKey, date) {
    const options = {
      method: "POST",
      body: JSON.stringify(value)
    };
    const resp = await fetch(
      `https://fooddiary-9cfea.firebaseio.com/Diary/${dayKey}/${date}/dishes.json`,
      options
    ).then(resp => resp.json());
    return resp;
  }
}

const base = new Firebase();
export default base;
