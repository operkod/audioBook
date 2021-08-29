export default (body: object): string => {
  if (typeof body !== 'object') {
    return '';
  }

  return Object.keys(body).reduce((accumulator, item) => {
    if (!body[item]) {
      return accumulator;
    }
    const value = body[item];

    return `${accumulator}${accumulator === '' ? '?' : '&'}${item}=${value}`;
  }, '');
};
