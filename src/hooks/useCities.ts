import { City } from '../types/City';
import { useEffect, useState } from 'react';
import { apiCitiesPath } from '../constants/apiPaths';
import searchAndWorkClient from '../clients/searchAndWork';
import cache from '../cache/Cache';
import { CacheKey } from '../constants/cache';

type UseCityProps = {
  loading: boolean;
  error: string;
  cities: City[];
}

export const useCities = (): UseCityProps => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cities, setCities] = useState<City[]>([]);

  const fetchCities = async () => {
    setLoading(true);

    try {
      const citiesResponse: City[] = await searchAndWorkClient.get(apiCitiesPath.getAll);
      setCities(citiesResponse);
      cache.setCache(CacheKey.Cities, citiesResponse);
      setLoading(false);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    const cities = cache.getCache<City>(CacheKey.Cities);

    if (cities) {
      setCities(cities)
      setLoading(false);
    } else {
      fetchCities()
    }
  }, []);


  return {
    loading,
    error,
    cities
  }
}