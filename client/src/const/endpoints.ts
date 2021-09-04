import getParams from 'helpers/getParams';

const host = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
const signIn = 'auth/signin';
const signUp = 'auth/signup';
const user = 'auth/user';

export default {
  getAuthUrl: (): string => `${host}/${signIn}`,
  getSingUpUrl: (): string => `${host}/${signUp}`,
  getUserUrl: (): string => `${host}/${user}`,
  getBooksUrl: (params: object): string => `${host}/book${getParams(params)}`,
  getBookLikeUrl: (): string => `${host}/book/like`,
};
