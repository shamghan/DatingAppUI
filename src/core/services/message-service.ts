import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../../type/Pagination';
import { Messages } from '../../features/messages/messages';
import { Message } from '../../type/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient)

  getMessages(container:string, pageNumber:number, pageSize:number) {
    let params = new HttpParams()
      .set('Container', container)
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize);
    return this.http.get<PaginatedResult<Message>>(this.baseUrl + 'message', {params});
  }
  deleteMessage(id: string) {
    return this.http.delete(this.baseUrl + 'message/' + id);
  }
  getMessageThread(memberId:string) {
    return this.http.get<Message[]>(this.baseUrl + 'message/thread/' + memberId);
  }
   sendMessage(recipientId:string, content:string){
    return this.http.post<Message>(this.baseUrl + 'message', {recipientId, content});
  }
}
