export const globalPath = '/';

export const generalPath = Object.freeze({
  works: `${globalPath}works`,
  companies: `${globalPath}companies`,
  login: `${globalPath}login`,
  register: `${globalPath}register`,
  account: `${globalPath}account`
});

export const companyPaths = Object.freeze({
  create: `${generalPath.companies}/create`,
  edit: `${generalPath.companies}/:id`
});