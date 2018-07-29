const countries = {
  "es-ES": "España",
  "en-GB": "ReinoUnido",
  "fr-FR": "Francia",
};

export const getCountryByLocale = locale =>
  countries[locale] || countries["es-ES"];
