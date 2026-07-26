import { Injectable, signal } from '@angular/core';
import { ToastType } from '../types/toast.types';
import { ToastState } from '../models/toast.state.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly Signaltoast = signal<ToastState>({
    visible: false,
    type: '' as ToastType,
    entity: ''
  });

  readonly toast = this.Signaltoast.asReadonly();

  private timeout?: ReturnType<typeof setTimeout>;

  show(type: ToastType, entity: string, duration = 3000): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.Signaltoast.set({
      visible: true,
      type,
      entity
    });

    this.timeout = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.Signaltoast.update(state => ({
      ...state,
      visible: false
    }));
  }
}