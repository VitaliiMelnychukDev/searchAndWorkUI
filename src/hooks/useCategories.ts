import { useEffect, useState } from 'react';
import { apiCategoriesPath } from '../constants/apiPaths';
import searchAndWorkClient from '../clients/searchAndWork';
import cache from '../cache/Cache';
import { CacheKey } from '../constants/cache';
import { Category } from '../types/Category';

type UseCategoriesProps = {
  loading: boolean;
  error: string;
  categories:  Category[];
}

export const useCategories = (): UseCategoriesProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const categoriesResponse: Category[] = await searchAndWorkClient.get(apiCategoriesPath.getAll);
      setCategories(categoriesResponse);
      cache.setCache(CacheKey.Categories, categoriesResponse);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    const categories = cache.getCache<Category>(CacheKey.Categories);

    if (categories) {
      setCategories(categories)
      setLoading(false);
    } else {
      fetchCategories()
    }
  }, []);


  return {
    loading,
    error,
    categories
  }
}