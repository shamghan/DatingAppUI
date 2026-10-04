import { Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MessageService } from '../../../core/services/message-service';
import { MemberService } from '../../../core/services/member-service';
import { Message } from '../../../type/message';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-message',
  imports: [DatePipe, TimeAgoPipe, FormsModule],
  templateUrl: './member-message.html',
  styleUrl: './member-message.css',
})
export class MemberMessage implements OnInit {
  @ViewChild('messageEndRef') messageEndRef!: ElementRef;
  private messageService = inject(MessageService);
  private memberService = inject(MemberService);
  protected messages = signal<Message[]>([]);
  private http = inject(HttpClient);
  protected messageContent = '';
  constructor() {
    effect(() => {
      if (this.messages().length > 0) {
        this.scrollToBottom();
      }
    })
  }
  ngOnInit(): void {
    this.loadMessages();
  }
  loadMessages() {
    const memberId = this.memberService.member()?.id;
    if (memberId) {
      this.messageService.getMessageThread(memberId).subscribe({
        next: (response) => {
          this.messages.set(response.map(message => ({
            ...message,
            currentUserSender: message.senderId !== memberId
          })));
        },
        complete: () => this.scrollToBottom(),
        error: (error) => {
          console.error('Error fetching messages:', error);
        },
      });
    }
  }
  sendMessage() {
    const recipientId = this.memberService.member()?.id;
    if (!recipientId) return;

    if (recipientId && this.messageContent.trim() !== '') {
      this.messageService.sendMessage(recipientId, this.messageContent).subscribe({
        next: (message) => {
          this.messages.update(messages => {
            message.currentUserSender = true;
            return [...messages, message];
          });
          this.messageContent = '';
        }
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
