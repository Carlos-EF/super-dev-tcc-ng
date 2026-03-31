import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'delete-button',
  imports: [ButtonModule],
  template: ` 
      <div class="flex flex-col justify-between gap-4">
        <p-button
          icon="pi pi-trash"
          severity="danger"
          [outlined]="true"
        />
      </div>
  `,
  styles: ``
})
export class DeleteButton {

}
