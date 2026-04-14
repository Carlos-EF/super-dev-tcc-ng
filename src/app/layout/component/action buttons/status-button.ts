import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'status-button',
  imports: [ButtonModule],
  template: `
  @if (status() ==  "ATIVO") {
    <div class="flex flex-col justify-between gap-4">
      <p-button
      icon="pi pi-circle-off"
      severity="secondary"
      [outlined]="true"
      />
    </div>
  } @else {
    <div class="flex flex-col justify-between gap-4">
      <p-button
      icon="pi pi-circle-on"
      severity="success"
      [outlined]="true"
      />
    </div>
  }
  `
})
export class StatusButton {
  status = input<string>();
}
