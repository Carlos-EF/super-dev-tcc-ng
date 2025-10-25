import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TagModule } from 'primeng/tag';

export interface Cliente {
  codigo: string;
  nome: string;
  tipo: string;
}

export interface Corretor {
  codigo: string;
  nome: string;
  creci: number;
}

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
  <div class="card mt-3 mb-3 flex flex-col border-r-2 border-l-2">
    <div class="flex flex-wrap flex-row gap-3 ">
      <div class="w-full flex flex-row items-center gap-2 border-r-2">
      <p-avatar
      shape="circle"
      size="xlarge"
      label="UL" />
        
      <p-tag
      severity="primary"
      value="Codigo" />
      
      <div class="font-bold text-xl">Nome</div> 
      <p-tag
      severity="warn"
      value="Tipo" />
    </div>

    <div>
      <div class="font-bold text-xl">Contato:</div>
    </div>
  </div>
</div>
  `,
  styles: ``
})
export class PessoasList {
  opcoesPessoas: MenuItem[];

  corretores: Corretor[];

  clientes: Cliente[];

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
    ];

    this.clientes = [
      {
        codigo: "090910",
        nome: "John Doe",
        tipo: "Interessado"
      },
      {
        codigo: "090911",
        nome: "John Donen",
        tipo: "Proprietário"
      },
      {
        codigo: "090912",
        nome: "Jane DOe",
        tipo: "Locatário"
      }
    ];

    this.corretores = [
      {
        codigo: "100101",
        nome: "Djohn Doe",
        creci: 41100
      },
      {
        codigo: "100102",
        nome: "Djane Doe",
        creci: 42101
      },
    ];
  };
}
