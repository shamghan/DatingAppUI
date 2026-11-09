import { HttpEvent, HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';

import { delay, identity, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';


type CacheEntry = {
  response : HttpEvent<unknown>;
  timestamp: number;
}
const cache = new Map<string, CacheEntry>();
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  
  const busyService = inject(BusyService);
  
const generateCacheKey = (url: string, params:HttpParams):string =>{
  const paramString = params.keys().map(key => `${key}=${params.get(key)}`).join('&');
  return paramString? `${url}?${paramString}` : url;
}

const cacheKey = generateCacheKey(req.url, req.params)
{

  const invalidateCache= (urlPattern:string )=>{
    for(const key of cache.keys())
    {
      if(key.includes(urlPattern))
      {
        cache.delete(key);
        //console.log(`Cache invalidated for: ${key}`);
      }
    }
  }
  const cacheKey = generateCacheKey(req.url, req.params);
  if(req.method === 'POST' && req.url.includes('/likes'))
  {
    invalidateCache(`/likes`);
  }
  if(req.method === 'POST' && req.url.includes('/message'))
  {
    invalidateCache(`/message`);
  }
  if(req.method.includes('POST') && req.url.includes('/logout'))
  {
    cache.clear();
  }
  if(req.method === 'GET')
  {
    const cacheresponse = cache.get(cacheKey);
    if(cacheresponse)
    {
      const isExpired= (Date.now() - cacheresponse.timestamp) > CACHE_DURATION_MS;
      if(!isExpired)
      {
        return of(cacheresponse.response);
      }else{
        cache.delete(cacheKey);
      }
    }
  }
} 
  busyService.busy();
  return next(req).pipe(
    (environment.production ? identity : delay(500)),
    tap(response=>{
      cache.set(cacheKey,{
        response,
        timestamp: Date.now()
      });
    }),
    finalize(() => {
      busyService.idle();
    })
  )
};
