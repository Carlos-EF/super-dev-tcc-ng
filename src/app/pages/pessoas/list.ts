import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-list',
  imports: [
    SplitButtonModule,
    ButtonModule,
    AvatarModule,
    TagModule,
  ],

  template: `
  <div class="flex justify-end">
    <p-splitbutton
    severity="success"
    icon="pi pi-plus"
    label="Cadastrar"
    [model]="opcoesPessoas" />
  </div>

  <!-- Decidir se vai ser em páginas separadas ou tudo junto com filtro -->
  `,
  styles: ``
})
export class PessoasList {
  opcoesPessoas: MenuItem[]
  constructor() {
    this.opcoesPessoas = [
      {
        label: "Cliente",
        icon: "pi pi-user",
        routerLink: "cliente/cadastrar"
      },
      {
        label: "Corretor",
        icon: "pi pi-id-card",
        routerLink: "corretor/cadastrar"
      }
    ]
  }
}
