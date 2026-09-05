import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Member } from '../../../type/member';
import { MemberService } from '../../../core/services/member-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {

 protected memberService = inject(MemberService);
 private route = inject(ActivatedRoute);
 protected member = signal<Member | undefined>(undefined);
 ngOnInit(): void {
    this.route.parent?.data.subscribe( data => {
      this.member.set(data['member']);
    });
 }
}
