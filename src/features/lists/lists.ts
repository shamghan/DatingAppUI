import { Component, inject, OnInit, signal } from '@angular/core';
import { LikeService } from '../../core/services/like-service';
import { single } from 'rxjs';
import { Member } from '../../type/member';
import { MemberCard } from '../members/member-card/member-card';

@Component({
  selector: 'app-lists',
  imports: [MemberCard],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements OnInit {

  private likeService = inject(LikeService);
  protected members = signal<Member[]>([]);
  protected predicate ='like';
  tabs=[
    {lable:'Liked', value:'liked'},
    {lable:'Liked me', value:'likedby'},
    {lable:'Mutual', value:'Mutual'},
   
  ]

  ngOnInit(): void {
    this.loadLike();
  }
  setPredicates(predicate:string)
  {
    if(this.predicate!==predicate)
    {
      this.predicate= predicate;
      this.loadLike();
    }
  }
  loadLike()
  {
    this.likeService.getLikes(this.predicate).subscribe({
      next: members=>this.members.set(members)
    })
  }
}
