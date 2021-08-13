const TOKEN = 'X-AuthToken';
const USER_NAME = 'name';
const LANGUAGE = 'i18nextLng';

const setToken = (value: string) => localStorage.setItem(TOKEN, value);
const getToken = () => localStorage.getItem(TOKEN);
const removeToken = () => localStorage.removeItem(TOKEN);

const setUserName = (value: string) => localStorage.setItem(USER_NAME, value);
const getUserName = () => localStorage.getItem(USER_NAME);
const removeUsername = () => localStorage.removeItem(USER_NAME);

const setLanguage = (value: string) => localStorage.setItem(LANGUAGE, value);
const getLanguage = () => localStorage.getItem(LANGUAGE);
const removeLanguage = () => localStorage.getItem(LANGUAGE);

export {
  setToken,
  getToken,
  removeToken,
  setUserName,
  getUserName,
  removeUsername,
  setLanguage,
  getLanguage,
  removeLanguage,
};
