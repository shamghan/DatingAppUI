import { Component, input, output } from '@angular/core';
import { RegisterCreds, User } from '../../../type/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  membersFromHome = input.required <User []>();
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  register() {
    console.log(this.creds);
  }
  cancel() {
   this.cancelRegister.emit(false);
  }
}
