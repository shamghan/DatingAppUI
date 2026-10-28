import { Injectable } from '@angular/core';
import { ConfirmDialog } from '../../shared/confirm-dialog/confirm-dialog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private dialogComponent?: ConfirmDialog;

  register(component: ConfirmDialog): void {
    this.dialogComponent = component;
  }

  unregister(component: ConfirmDialog): void {
    if (this.dialogComponent === component) {
      this.dialogComponent = undefined;
    }
  }

  confirm(message: string = 'Are you sure?'): Promise<boolean> {
    if (!this.dialogComponent) {
      throw new Error('Confirm dialog component is not registered');
    }
    return this.dialogComponent.open(message);
  }
}
