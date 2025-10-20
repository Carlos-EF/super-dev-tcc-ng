import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-list',
  imports: [
    ButtonModule,
    RouterLink,
  ],
  template: `
     <div class="flex">
       <p-button
       icon="pi pi-plus"
       label="Cadastrar"
       severity="success"
       routerLink="cadastrar"/>
     </div>

     <!-- Para fazer o modelo de listagem -->
  `,
  styles: ``
})
export class ImovelList {

}
