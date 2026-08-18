import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected members=signal<any>([]);
  private http = inject(HttpClient);
  protected readonly title = signal('dating app');
  async ngOnInit() {
    this.members.set(await this.getMembers());
}
//  ngOnInit(): void {
//     this.http.get('https://localhost:44329/api/members').subscribe({
//      next:response=> this.members.set(response),
//      error: error => console.log(error),
//      complete:() => console.log('completed http request')
//   })
//  }



async getMembers(){
  try {
     return lastValueFrom(this.http.get('http://localhost:5186/api/members'));
    
  } catch (error) {
    console.error(error);
    throw error;
  } 
}
}
