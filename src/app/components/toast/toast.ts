import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [
    CommonModule,
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  @Input() type: ToastType = 'create';
  @Input() entity = 'register';
  @Input() visible = false;

  get message(): string {
    switch (this.type) {
      case 'create':
        return `${this.entity
      
        } cadastrado(a) com sucesso!`;

      case 'edicao':
        return `${this.entity
      
        } atualizado(a) com sucesso!`;

      case 'exclusao':
        return `${this.entity
      
        } excluído(a) com sucesso!`;

      default:
        return 'Operação realizada com sucesso!';
    }
  }

  close() {
    this.visible = false;
  }
}
