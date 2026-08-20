import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { user } from '../../type/user';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http=inject(HttpClient);
  currentUser= signal<user | null>(null);
  baseUrl='http://localhost:5186/api/';
  login(creds:any){
    return this.http.post(this.baseUrl+'account/login',creds).pipe(
      tap(user =>{
        if(user){
          localStorage.setItem('user',JSON.stringify(user))
          this.currentUser.set(user as user);
        }

      })
    )
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
