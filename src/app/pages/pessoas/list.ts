import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

export interface Pessoa {
  codigoPessoa: string;
  nome: string;
  tipo: string;
  email: string;
  numero: string;
}

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

  @for (pessoa of pessoas; track pessoa) {
    <div class="flex flex-row justify-between mt-2 mb-3 bg-gray-800 border-l-2">
      <div class="flex flex-row items-center ml-2 gap-2 w-full">
        <p-avatar 
        label="{{pessoa.nome.substring(0,2)}}"
        shape="circle"
        size="xlarge"/>
        <div class="flex gap-4">
          <div class="flex flex-col">
            <p-tag
            class="max-h-min max-w-min mt-2"
            severity="primary"
            value="{{pessoa.codigoPessoa}}" />
            <h3>{{pessoa.nome}}</h3>
            <p-tag
            class="max-h-min max-w-min mb-2"
            severity="warn"
            value="{{pessoa.tipo}}" />
          </div>
          <div>
            <h6>Contato:</h6>
            <div class="flex flex-col w-full justify-between">
              <p class="pi pi-phone"> {{pessoa.numero}}</p>
              <p class="pi pi-at">{{pessoa.email}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  `,
  styles: ``
})
export class PessoasList {
pessoas: Pessoa [];

constructor() {
  this.pessoas = [ {
    codigoPessoa: "022333",
    nome: "Carlos Eduardo",
    tipo: "Interessado",
    email: "carlinhos244@gmail.com",
    numero: "(47) 91234-1234",
  },
  {
    codigoPessoa: "022334",
    nome: "Rebeca Felix",
    tipo: "Corretor",
    email: "rebecafelix99@gmail.com",
    numero: "(47) 94321-1234",
  }
  ]
}
}
