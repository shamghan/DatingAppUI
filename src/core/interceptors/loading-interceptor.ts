import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';

import { delay, of, tap } from 'rxjs';
const cache = new Map<string, HttpEvent<unknown>>();
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  
  const busyService = inject(BusyService);
  
  if(req.method === 'GET')
  {
    const cacheResponse = cache.get(req.url);
    if(cacheResponse)
    {
      return of(cacheResponse);
    }
  }
  
  busyService.busy();
  return next(req).pipe(
    delay(2000),
    tap(response=>{
      cache.set(req.url,response);
    }),
    finalize(() => {
      busyService.idle();
    })
  )
};
