import { Component, effect, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MessageService } from '../../../core/services/message-service';
import { MemberService } from '../../../core/services/member-service';
import { Message } from '../../../type/message';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PresenceService } from '../../../core/services/presence-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-message',
  imports: [DatePipe, TimeAgoPipe, FormsModule],
  templateUrl: './member-message.html',
  styleUrl: './member-message.css',
})
export class MemberMessage implements OnInit, OnDestroy {
  @ViewChild('messageEndRef') messageEndRef!: ElementRef;
  protected messageService = inject(MessageService);
  private memberService = inject(MemberService);

  private http = inject(HttpClient);
  protected presenceService = inject(PresenceService);
  private route = inject(ActivatedRoute);
  protected messageContent = '';
  constructor() {
    effect(() => {
      const currentMessages = this.messageService.messageThread();
      if (currentMessages.length > 0) {
        this.scrollToBottom();
      }
    })
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  ngOnInit(): void {
   // this.loadMessages();
   this.route.parent?.paramMap.subscribe({
    next: params=>{
      const otherUserId = params.get('id');
      if(!otherUserId) throw new Error('can not connect to hub');
      this.messageService.createHubConnection(otherUserId);
    }
   })
  }
  
  sendMessage() {
    const recipientId = this.memberService.member()?.id;
    if (!recipientId) return;

    if (recipientId && this.messageContent.trim() !== '') {
      this.messageService.sendMessage(recipientId, this.messageContent)?.then(()=>{
        this.messageContent ='';
      });
    }
  }
  scrollToBottom() {
    setTimeout(() => {

      if (this.messageEndRef) {
        this.messageEndRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    })
  }
}
