import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'edit-button',
  imports: [ButtonModule],
  template: ` 
      <div class="flex flex-col justify-between gap-4">
        <p-button
          icon="pi pi-pencil"
          severity="warn"
          [outlined]="true"
        />
      </div>
  `,
  styles: ``
})
export class EditButton {

}
