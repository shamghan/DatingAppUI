import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member } from '../../type/member';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private httpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl= environment.apiUrl;
  getMembers()
  {
    return this.httpClient.get<Member[]>(this.baseUrl+'members', this.getHttpOption());
  }
  getMember(id:string){

    return this.httpClient.get<Member>(this.baseUrl+'member/id',this.getHttpOption());
  }
  private getHttpOption(){
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer '+this.accountService.currentUser()?.token
      })
    }

  }
}
