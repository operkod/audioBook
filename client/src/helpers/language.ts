export const getLocation = (): string => {
  const lang = navigator.language
  return lang.split('-')[0]
}

const languages = ['ru', 'en']
export const getTargetLanguage = () => {
  return languages.includes(getLocation()) ? getLocation() : 'ru'
}