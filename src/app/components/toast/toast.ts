import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss'
})
export class Toast {

  private readonly toastService = inject(ToastService);

  readonly state = this.toastService.toast;

  readonly visible = computed(() => this.state().visible);
  readonly type = computed(() => this.state().type);
  readonly entity = computed(() => this.state().entity);

  readonly message = computed(() => {
    switch (this.type()) {
      case 'create':
        return `${this.entity()} criado com sucesso.`;

      case 'edit':
        return `${this.entity()} editado com sucesso.`;

      case 'delete':
        return `${this.entity()} removido com sucesso.`;

      default:
        return '';
    }
  });

  close(): void {
    this.toastService.hide();
  }

}