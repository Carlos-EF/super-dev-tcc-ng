import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-list',
  imports: [
    ButtonModule,
    AvatarModule,
    TagModule,
  ],
  
  template: `
  <div class="flex justify-end">
    <p-button
    severity="success"
    icon="pi pi-plus"
    label="Cadastrar" />
  </div>

  <!-- Decidir se vai ser em páginas separadas ou tudo junto com filtro -->
  `,
  styles: ``
})
export class PessoasList {
}
