export const userMessagesMap = {
  SUCCESS_REGISTER: {
    type: "success",
    msg: `Ви успішно зареєструвались`,
  },
  SUCCESS_AUTH: {
    type: "success",
    msg: `Ви успішно авторизувались`,
  },
  EMAIL_NOT_FOUND: {
    type: "error",
    msg: `E-mail введено не вірно`,
  },
  INVALID_PASSWORD: {
    type: "error",
    msg: `Пароль введено не вірно`,
  },
  MISSING_EMAIL: {
    type: "error",
    msg: `Емейл не введено`,
  },
  MISSING_PASSWORD: {
    type: "error",
    msg: `Введено некоректний пароль.`,
  },
  EMAIL_EXISTS: {
    type: "error",
    msg: `Ввведений вами e-mail вже зареєстрований у системі`,
  },
  INVALID_EMAIL: {
    type: "error",
    msg: `Введений вами e-mail некоректний`,
  },
  ADMIN_ONLY_OPERATION: {
    type: "error",
    msg: `Помилка сервера`,
  },
  FAILED_TO_FETCH: {
    type: "error",
    msg: `Failed to fetch`,
  },
  UNKNOWN_ERROR: {
    type: "error",
    msg: `щось пішло не так`,
  },
};
