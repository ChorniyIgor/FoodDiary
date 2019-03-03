class Firebase {
  constructor() {
    this.mainFoodCatalogUrl = `https://fooddiary-9cfea.firebaseio.com/MainDishes.json`;
    this.apiKey = "AIzaSyDusvIB2fy-VxeOK94Ar0NbQH6kzGe1zFg";
    this.usersCatalog = "https://fooddiary-9cfea.firebaseio.com/Users";
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

  async getUserFoodCatalog(userId) {
    const resp = await fetch(`${this.usersCatalog}/${userId}/UserDishes.json`).then(resp =>
      resp.json()
    );
    return resp;
  }

  async getUserDiary(userId) {
    const resp = await fetch(`${this.usersCatalog}/${userId}/Diary.json`).then(resp => resp.json());
    return resp;
  }

  async sendNewDish(val, userId) {
    const options = {
      method: "POST",
      body: JSON.stringify(val)
    };
    const resp = await fetch(`${this.usersCatalog}/${userId}/UserDishes.json`, options).then(resp =>
      resp.json()
    );
    return resp;
  }

  async sendNewDay(date, userId) {
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
    const resp = await fetch(`${this.usersCatalog}/${userId}/Diary.json`, options).then(resp =>
      resp.json()
    );
    return resp;
  }

  async sendNewDishToDiary(value, dayKey, date, userId) {
    const options = {
      method: "POST",
      body: JSON.stringify(value)
    };
    const resp = await fetch(
      `${this.usersCatalog}/${userId}/Diary/${dayKey}/${date}/dishes.json`,
      options
    ).then(resp => resp.json());
    return resp;
  }
}

const base = new Firebase();
export default base;
