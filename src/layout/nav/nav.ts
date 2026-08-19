import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private accountService= inject(AccountService)
    protected creds:any = {email:'', password:''};
    login() {
      this.accountService.login(this.creds).subscribe({
        next: result => console.log(result),
        error: error => console.log(error)
      })
      console.log(this.creds)
    }
}
