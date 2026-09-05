import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Member, Photo } from '../../type/member';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private httpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl= environment.apiUrl;
  editMode = signal(false);
  getMembers()
  {
    //return this.httpClient.get<Member[]>(this.baseUrl+'members', this.getHttpOption());
    return this.httpClient.get<Member[]>(this.baseUrl+'members');
  }
  getMember(id:string){

    //return this.httpClient.get<Member>(this.baseUrl+'member/id',this.getHttpOption());
    return this.httpClient.get<Member>(this.baseUrl+'members/'+id);
  }
  getMemberPhotos(id:string)
  {
    return this.httpClient.get<Photo[]>(this.baseUrl+'members/'+id+'/photos');
  }
  // private getHttpOption(){
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer '+this.accountService.currentUser()?.token
  //     })
  //   }

  // }
}
