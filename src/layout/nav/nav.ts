import { Component, inject, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
    protected accountService= inject(AccountService)
    protected creds:any = {email:'', password:''};

    login() {
      this.accountService.login(this.creds).subscribe({
        next: result => {
          console.log(result);

          this.creds = {email:'', password:''};
        },
        error: error => console.log(error)
      })
      console.log(this.creds)
    }
    logout(){
      this.accountService.logout();
    }
}
