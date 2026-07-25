import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToastType } from '../../types/toast.types';

@Component({
  selector: 'app-toast',
  imports: [
    CommonModule,
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  @Input() type: ToastType = '';
  @Input() entity = 'register';
  @Input() visible = false;

  get message(): string {
    switch (this.type) {
      case 'create':
        return `${this.entity
          } cadastrado(a) com sucesso!`;

      case 'edit':
        return `${this.entity
          } atualizado(a) com sucesso!`;

      case 'delete':
        return `${this.entity
          } excluído(a) com sucesso!`;

      default:
        return 'Operação realizada com sucesso!';
    }
  }

  show(type: ToastType, entity: string, duration = 3000) {
    this.type = type;
    this.entity = entity;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
    }, duration);
  }

  close() {
    this.visible = false;
  }
}
