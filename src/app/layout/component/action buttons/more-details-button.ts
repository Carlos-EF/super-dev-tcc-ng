import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'more-details-button',
  imports: [ButtonModule],
  template: ` 
      <div class="flex flex-col justify-between gap-4">
        <p-button
          icon="pi pi-search"
          severity="info"
          [outlined]="true"
        />
      </div>
  `,
  styles: ``
})
export class MoreDetailsButton {

}
