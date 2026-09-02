import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable } from 'rxjs';
import { Member } from '../../../type/member';

@Component({
  selector: 'app-member-detailed',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
 
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected member$?: Observable<Member>;
   ngOnInit(): void {
    this.member$ = this.loadMember();
  }
  loadMember(): Observable<Member>
  {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id', id);
    if (!id) return EMPTY;
      return this.memberService.getMember(id);
  }
}
