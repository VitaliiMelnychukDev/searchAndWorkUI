import { City } from './City';
import { Category } from './Category';

export type Work = {
  id: number;
  cityId: number;
  address:string;
  categoryId: number;
  payment: number;
  title: string;
  description: string;
  email: string;
  phone?: string;
  startTime: number;
  endTime: number;
  countWorkers: number;
  city: City;
  category: Category;
}

export type WorksResponse = {
  works: Work[],
  total: number,
}

export type Worker = {
  id: number;
  email: string;
  phone: number | null | undefined;
  name: string;
  categoryDescription: string;
  categoryName: string;
  cityName: string;
  startTime: number;
  endTime: number;
  workId: number | null;
}