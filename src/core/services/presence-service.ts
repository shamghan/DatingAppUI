import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ToastService } from './toast-service';
import { User } from '../../type/user';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private hubUrl = environment.hubUrl;
  private toast = inject(ToastService);
  hubConnection?:HubConnection;
  
  createHubConnection(user: User) {
  this.hubConnection = new HubConnectionBuilder()
    .withUrl(`${this.hubUrl}presence`, {
      accessTokenFactory: () => user.token
    })
    .withAutomaticReconnect()
    .build();
    this.hubConnection.on('UserOnline', email => {
      this.toast.success(email + ' has connected');
    });

    this.hubConnection.on('UserOffline', email => {
      this.toast.info(email + ' has disconnected');
    });

    this.hubConnection.start()
      .then(() => this.toast.success('Connected to presence hub'))
      .catch(error => console.log(error));
  }
stopHubConnctio()
{
   if(this.hubConnection?.state=== HubConnectionState.Connected){
    this.hubConnection.stop().catch(error => console.log(error));
   }
}
}
