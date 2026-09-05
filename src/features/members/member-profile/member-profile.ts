import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Editablemember, Member } from '../../../type/member';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit, OnDestroy {

  @ViewChild('editForm') editForm?: NgForm;
  protected memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected member = signal<Member | undefined>(undefined);
  protected editableMember: Editablemember = {
    displayName: '',
    description: '',
    city: '',
    country: ''
  };
  private toast = inject(ToastService);
  constructor() {

  }
  ngOnInit(): void {
    this.route.parent?.data.subscribe(data => {
      this.member.set(data['member']);
    });
    this.editableMember = {
      displayName: this.member()?.dsiplayName || '',
      description: this.member()?.description,
      city: this.member()?.city || '',
      country: this.member()?.country || ''
    };
  }
  updateprofile() {
    if (!this.member()) return;
    const updatedmember = { ...this.member(), ...this.editableMember };
    console.log(updatedmember);
    this.toast.success('Profile updated successfully');
    this.memberService.editMode.set(false);
    // this.member.set(updatedmember);
    // this.editForm?.reset(this.editableMember);
    // this.memberService.editMode.set(false);
  }
  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}
