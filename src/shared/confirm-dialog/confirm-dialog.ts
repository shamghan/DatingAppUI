import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { ConfirmDialogService } from '../../core/services/confirm-dialog-service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog implements AfterViewInit, OnDestroy {
  @ViewChild('dialogRef') dialogRef!: ElementRef<HTMLDialogElement>;
  message = 'Are you sure?';
  private readonly confirmDialogService = inject(ConfirmDialogService);
  private resolver: ((result: boolean) => void) | null = null;

  ngAfterViewInit(): void {
    this.confirmDialogService.register(this);
  }

  ngOnDestroy(): void {
    this.confirmDialogService.unregister(this);
  }

  open(message: string): Promise<boolean> {
    this.message = message;
    this.dialogRef.nativeElement.showModal();
    return new Promise((resolver) => (this.resolver = resolver));
  }

  confirm(): void {
    this.dialogRef.nativeElement.close();
    this.resolver?.(true);
    this.resolver = null;
  }

  cancel(): void {
    this.dialogRef.nativeElement.close();
    this.resolver?.(false);
    this.resolver = null;
  }
}
