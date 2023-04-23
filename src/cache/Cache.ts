import { CacheKey } from '../constants/cache';

export class Cache {
  private cachedData: Map<CacheKey, any> = new Map();

  public setCache<T>(key: CacheKey, data: T[]): void {
    this.cachedData.set(key, data);
  }

  public getCache<T>(key: CacheKey): T[] | null {
    return this.cachedData.get(key);
  }
}

const cache = new Cache();

export default cache;