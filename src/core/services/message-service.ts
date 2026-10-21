import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../../type/Pagination';

import { Message } from '../../type/message';
import { AccountService } from './account-service';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient)
  private hubUrl = environment.hubUrl;
  private accountService = inject(AccountService);
  private hubConnection? : HubConnection;
  messageThread = signal<Message[]>([]);
createHubConnection(otherUserId:string){
  const currentUser = this.accountService.currentUser();
  if(!currentUser) return;
   this.hubConnection= new HubConnectionBuilder()
   .withUrl(this.hubUrl + 'messages?UserId='+otherUserId,{
    accessTokenFactory:() => currentUser.token
   })
   .withAutomaticReconnect()
   .build();

   this.hubConnection.start().catch(error => console.log(error));
   this.hubConnection.on('ReceiveMessageThread', (messages:Message[])=>{
    this.messageThread.set(messages.map(message => ({
            ...message,
            currentUserSender: message.senderId !== otherUserId
          })));
   })
}
stopHubConnection()
{
  if(this.hubConnection?.state == HubConnectionState.Connected){
    this.hubConnection.stop().catch(error => console.log(error)) 
  }
}
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
