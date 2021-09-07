import getParams from 'helpers/getParams';

const host = window.location.origin; // TODO:
const signIn = 'user/signin';
const signUp = 'user/signup';
const user = 'user/me';

export default {
  getUserUrl: (): string => `${host}/${user}`,
  getAuthUrl: (): string => `${host}/${signIn}`,
  getSingUpUrl: (): string => `${host}/${signUp}`,
  getUserAvatarUrl: (): string => `${host}/user/photo`,
  getBooksUrl: (params: object): string => `${host}/book${getParams(params)}`,
  getBookCommentUrl: (id: string): string => `${host}/book/comment?id=${id}`,
  getBookAddCommentUrl: (): string => `${host}/book/comment/add`,
  getBookLikeUrl: (): string => `${host}/book/like`,
};
