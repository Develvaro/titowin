const countries = {
  "es-ES": "España"
};

export const getCountryByLocale = locale =>
  countries[locale] || countries["es-ES"];
