import { Component, inject, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

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
    private toast = inject(ToastService)
    login() {
      this.accountService.login(this.creds).subscribe({
        next: result => {
          this.router.navigateByUrl('/members');
          console.log(result);
          this.toast.success('Logged in successfull');
          this.creds = {email:'', password:''};
        },
        error: error => {
         this.toast.error(error.error);
          console.log(error.error);
        }
      })
      console.log(this.creds)
    }
    logout(){
      this.accountService.logout();
      this.router.navigateByUrl('/');
    }
}
