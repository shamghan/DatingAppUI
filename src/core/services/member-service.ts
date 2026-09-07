import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Editablemember, Member, Photo } from '../../type/member';
import { AccountService } from './account-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private httpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  private baseUrl= environment.apiUrl;
  editMode = signal(false);
  member = signal<Member | null> (null);
  getMembers()
  {
    //return this.httpClient.get<Member[]>(this.baseUrl+'members', this.getHttpOption());
    return this.httpClient.get<Member[]>(this.baseUrl+'members');
  }
  getMember(id:string){

    //return this.httpClient.get<Member>(this.baseUrl+'member/id',this.getHttpOption());
    return this.httpClient.get<Member>(this.baseUrl+'members/'+id).pipe(
     tap(member => {
      this.member.set(member);
     })
    );
  }
  getMemberPhotos(id:string)
  {
    return this.httpClient.get<Photo[]>(this.baseUrl+'members/'+id+'/photos');
  }
  updateMember(member: Editablemember)
  {
    return this.httpClient.put(this.baseUrl+'members', member);
  }
  uploadPhoto(file: File)
  {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<Photo>(this.baseUrl+'members/add-photo', formData);
  }
  // private getHttpOption(){
  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: 'Bearer '+this.accountService.currentUser()?.token
  //     })
  //   }

  // }


  setMainPhoto(photo: Photo)
  {
    return this.httpClient.put(this.baseUrl+'members/set-main-photo/'+ photo.id, {});
  }
}
