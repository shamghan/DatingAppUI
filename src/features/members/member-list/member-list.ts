import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { Member, MemberParams } from '../../../type/member';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from "../member-card/member-card";
import { PaginatedResult } from '../../../type/Pagination';
import { Paginator } from "../../../shared/paginator/paginator";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard, Paginator],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  private memberService = inject(MemberService);
  protected paginatedMembers= signal<PaginatedResult<Member> | null>(null);
  // protected paginatedMembers$?: Observable<PaginatedResult<Member>>;
  protected memberParams = new MemberParams();
  constructor()
  {
   
  }
  ngOnInit(): void {
     this.loadMember();
  }
  loadMember()
  {
    //this.paginatedMembers$=this.memberService.getMembers(this.pageNumber, this.pageSize);

       this.memberService.getMembers(this.memberParams).subscribe({
        next: result=> {
          this.paginatedMembers.set(result)
        }

       });
  }

  onPageChange(event:{pageNumber: number, pageSize:number})
  {
    this.memberParams.pageSize= event.pageSize;
    this.memberParams.pageNumber= event.pageNumber;
    this.loadMember();
  }
}
