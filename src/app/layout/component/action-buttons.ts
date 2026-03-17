import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-action-buttons',
  imports: [ButtonModule],
  template: ` 
      <div class="flex flex-col justify-between gap-4">
        <p-button
          icon="pi pi-search"
          severity="info"
          [outlined]="true"
        />
          
        <p-button
          icon="pi pi-pencil"
          severity="warn"
          [outlined]="true"
        />
          
        <p-button
          icon="pi pi-trash"
          severity="danger"
          [outlined]="true"
        />
      </div>
  `,
  styles: ``
})
export class ActionButtons {

}
