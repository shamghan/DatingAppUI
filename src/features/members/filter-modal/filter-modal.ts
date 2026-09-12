import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { MemberParams } from '../../../type/member';

@Component({
  selector: 'app-filter-modal',
  imports: [],
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.css',
})
export class FilterModal {
  @ViewChild('filterModal') modalRef!:ElementRef<HTMLDialogElement>;
  closedModal = output();
  submitData = output<MemberParams>();
  open()
  {
    this.modalRef.nativeElement.showModal();


  }
  close()
  {
    this.modalRef.nativeElement.close();
    this.closedModal.emit();
  }
  submit()
  {
    this.submitData.emit(new MemberParams());
    this.close();
  }
}
