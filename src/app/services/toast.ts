import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class Toast {
  private _toasts = signal<ToastMessage[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private counter = 0;

  show(message: string, type: ToastType = 'info'): void {
    const id = ++this.counter;
    this._toasts.update(list => [...list, { id, message, type }]);
    setTimeout(() => this.remove(id), 3000);
  }

  success(message: string): void { this.show(message, 'success'); }
  error(message: string): void { this.show(message, 'error'); }
  info(message: string): void { this.show(message, 'info'); }

  remove(id: number): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }
}
