import { Company } from './Company';
import { City } from './City';
import { Category } from './Category';

export type Work = {
  id: number;
  companyId: number;
  cityId: number;
  categoryId: number;
  payment: number;
  title: string;
  description: string;
  email: string;
  phone?: string;
  expiredAt: number;
  company: Pick<Company, 'id' | 'title'>;
  city: City;
  category: Category;
}

export type WorksResponse = {
  works: Work[],
  total: number,
}