export const globalPath = '/';

export const generalPath = Object.freeze({
  works: `${globalPath}works`,
  work: `${globalPath}work`,
  companies: `${globalPath}companies`,
  login: `${globalPath}login`,
  register: `${globalPath}register`,
  account: `${globalPath}account`,
  accountCategories: `${globalPath}account-categories`,
  accountHours: `${globalPath}account-hours`
});

export const companyPaths = Object.freeze({
  create: `${generalPath.companies}/create`,
  edit: `${generalPath.companies}/:id`
});

export const workPaths = Object.freeze({
  create: `${generalPath.works}/create`,
  edit: `${generalPath.works}/:id`,
  view: `${generalPath.work}/:id`
});

export const accountCategoriesPaths = Object.freeze({
  create: `${generalPath.accountCategories}/create`,
  edit: `${generalPath.accountCategories}/:id`
});

export const accountHoursPaths = Object.freeze({
  create: `${generalPath.accountHours}/create`,
  edit: `${generalPath.accountHours}/:id`
});