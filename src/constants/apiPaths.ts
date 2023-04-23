

export const apiGeneralPath = Object.freeze({
  account: `account`,
  auth: 'auth',
  company: 'company',
  work: 'work',
  city: 'city',
  category: 'category',
});

export const apiCompanyPath = Object.freeze({
  search: `${apiGeneralPath.company}/search`,
});

export const apiAuthPath =  Object.freeze({
  login: `${apiGeneralPath.auth}/login`,
  logout: `${apiGeneralPath.auth}/logout`,
  refresh: `${apiGeneralPath.auth}/refresh`,
  register: `${apiGeneralPath.auth}/register`
});
