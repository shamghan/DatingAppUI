import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../type/user';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from '../../environments/environment.development';
import { LikeService } from './like-service';
import { PresenceService } from './presence-service';
import { HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http=inject(HttpClient);
  private likesService =inject(LikeService);
  currentUser= signal<User | null>(null);
  private presenceService = inject(PresenceService);
  private baseUrl= environment.apiUrl;
  registerUser(creds: RegisterCreds)
  {
    return this.http.post<User>(this.baseUrl+"account/register",creds,{withCredentials:true}).pipe(
        tap(user =>{
          if(user)
          {
            this.setCurrentUser(user);
            this.startTokenRefreshInterval();
          }
        })
    )
  }
  login(creds:LoginCreds){
    return this.http.post<User>(this.baseUrl+'account/login',creds,{withCredentials:true}).pipe(
      tap(user =>{
        if(user){
            this.setCurrentUser(user);
            this.startTokenRefreshInterval();
        }

      })
    )
  }
  refreshToken()
  {
    return this.http.post<User>(this.baseUrl+'account/refresh-token', {}, {withCredentials:true});
  }
  startTokenRefreshInterval(){
    setInterval(()=>{
      this.http.post<User>(this.baseUrl+'account/refresh-token', {}, {withCredentials:true}).subscribe({
        next:user=>{
          this.setCurrentUser(user);
        },
        error:()=>{
          this.logout();
        }
      })
    }, 5*60*1000)
  }
  setCurrentUser(user:User)
  {
    user.roles=this.getrolesFromToken(user);
    //localStorage.setItem('user',JSON.stringify(user))
    this.currentUser.set(user as User);
    this.likesService.getLikeIds();
    if(this.presenceService.hubConnection?.state !== HubConnectionState.Connected)
    {
      this.presenceService.createHubConnection(user);
    }
  }
  logout(){
    //localStorage.removeItem('user');
    localStorage.removeItem('filters');
    this.likesService.clearLikeIds();
    this.currentUser.set(null);
    this.presenceService.stopHubConnctio();
  }
  private getrolesFromToken(user: User):string[]{
    const payload= user.token.split('.')[1];
    const decoded = atob(payload);
    const jsonPayload = JSON.parse(decoded);
    return Array.isArray(jsonPayload.role) ? jsonPayload.role : [jsonPayload.role];
  }
}
