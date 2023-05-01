import { Category } from './Category';


export type AccountCategory = {
  accountId: number;
  categoryId: number;
  category: Category;
  description: string;
}