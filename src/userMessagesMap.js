export const userMessagesMap = {
  SUCCESS: {
    type: "success",
    msg: `Success`,
  },
  SUCCESS_REGISTER: {
    type: "success",
    msg: `You have successfully registered`,
  },
  SUCCESS_AUTH: {
    type: "success",
    msg: `You have successfully logged in`,
  },
  EMAIL_NOT_FOUND: {
    type: "error",
    msg: `The entered email is incorrect`,
  },
  INVALID_PASSWORD: {
    type: "error",
    msg: `The entered password is incorrect`,
  },
  MISSING_EMAIL: {
    type: "error",
    msg: `Email not entered`,
  },
  MISSING_PASSWORD: {
    type: "error",
    msg: `Incorrect password entered`,
  },
  EMAIL_EXISTS: {
    type: "error",
    msg: `The email you entered is already registered`,
  },
  INVALID_EMAIL: {
    type: "error",
    msg: `The entered email is incorrect`,
  },
  ADMIN_ONLY_OPERATION: {
    type: "error",
    msg: `Server error`,
  },
  FAILED_TO_FETCH: {
    type: "error",
    msg: `Failed to fetch`,
  },
  UNKNOWN_ERROR: {
    type: "error",
    msg: `Something went wrong`,
  },
};
