import { Component, inject, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
    protected accountService= inject(AccountService);
    private router = inject(Router);
    protected creds:any = {email:'', password:''};

    login() {
      this.accountService.login(this.creds).subscribe({
        next: result => {
          this.router.navigateByUrl('/members');
          console.log(result);

          this.creds = {email:'', password:''};
        },
        error: error => console.log(error)
      })
      console.log(this.creds)
    }
    logout(){
      this.accountService.logout();
      this.router.navigateByUrl('/');
    }
}
