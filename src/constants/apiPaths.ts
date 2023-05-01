

export const apiGeneralPath = Object.freeze({
  account: `account`,
  auth: 'auth',
  company: 'company',
  work: 'work',
  city: 'city',
  category: 'category',
  accountCategory: 'account-category',
  accountHour: 'account-hour',
});

export const apiCompanyPath = Object.freeze({
  search: `${apiGeneralPath.company}/search`,
});

export const apiWorkPath = Object.freeze({
  search:  `${apiGeneralPath.work}/search`,
  getAccountWorks:  `${apiGeneralPath.work}/getAccountWorks`,
});

export const apiCitiesPath = Object.freeze({
  getAll: `${apiGeneralPath.city}/getAll`,
})

export const apiCategoriesPath = Object.freeze({
  getAll: `${apiGeneralPath.category}/getAll`,
})

export const apiAccountCategoriesPath = Object.freeze({
  getAll: `${apiGeneralPath.accountCategory}/getAll`,
})

export const apiAccountHoursPath = Object.freeze({
  getAll: `${apiGeneralPath.accountHour}/getAll`,
})

export const apiAuthPath =  Object.freeze({
  login: `${apiGeneralPath.auth}/login`,
  logout: `${apiGeneralPath.auth}/logout`,
  refresh: `${apiGeneralPath.auth}/refresh`,
  register: `${apiGeneralPath.auth}/register`
});
