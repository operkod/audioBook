export const emailValidator = (email: string) => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  return reg.test(email)
}

export const phoneValidator = (phone: string) => {
  const reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
  return reg.test(phone)
}
