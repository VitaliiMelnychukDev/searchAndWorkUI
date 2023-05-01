import config from '../configs/base';
import { generalPath } from '../constants/paths';
import { apiGeneralPath } from '../constants/apiPaths';

type QueryParams = {
  [key in string]?: string | number
};
export class ApiUrlHelper {
  static buildFullUrl(url: string): string {
    return `${ApiUrlHelper.getBaseApiUrl()}${url}`
  }

  static buildUrlWithParams(url: string, queryParams: QueryParams = {}): string {
    return `${url}?${ApiUrlHelper.buildQueryParams(queryParams)}`;
  }

  static buildQueryParams(queryParams: QueryParams): string {
    const params = [];
    for (const [key, param] of Object.entries(queryParams)) {
      params.push(`${key}=${param}`);
    }

    return params.join('&');
  }

  static getBaseApiUrl(): string {
    return config.CHARTS_API_URL;
  }

  static getCompanyUrl(companyId: number): string {
    return `${apiGeneralPath.company}/${companyId}`;
  }

  static getWorkUrl(workId: number): string {
    return `${apiGeneralPath.work}/${workId}`;
  }

  static getAccountCategoryUrl(accountCategoryId: number): string {
    return `${apiGeneralPath.accountCategory}/${accountCategoryId}`;
  }

  static getAccountHourUrl(accountHourId: number): string {
    return `${apiGeneralPath.accountHour}/${accountHourId}`;
  }
}