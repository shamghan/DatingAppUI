import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ToastService } from './toast-service';
import { User } from '../../type/user';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { Message } from '../../type/message';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private hubUrl = environment.hubUrl;
  private toast = inject(ToastService);
  hubConnection?: HubConnection;
  onlineUsers = signal<string[]>([]);
  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}presence`, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();
    this.hubConnection.on('UserOnline', userId => {
      this.onlineUsers.update(user => [...user, userId])
    });

    this.hubConnection.on('UserOffline', userId => {
      this.onlineUsers.update(users => users.filter(x => x !== userId))
    });

    this.hubConnection.on('GetOnlineUsers', userIds => {
      this.onlineUsers.set(userIds);
    });
    this.hubConnection.on('NewMessageReceived',(message:Message) =>{
      this.toast.info(message.senderDisplayName + ' has sent you a new message',10000, message.senderImageUrl,`/members/${message.senderId}/messages`);
    })
    this.hubConnection.start().catch(error => console.log(error));
  }
  stopHubConnctio() {
    if (this.hubConnection?.state === HubConnectionState.Connected) {
      this.hubConnection.stop().catch(error => console.log(error));
    }
  }
}
