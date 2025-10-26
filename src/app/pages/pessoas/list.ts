import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TagModule } from 'primeng/tag';

export interface PessoaResponse {
  codigo: string;
  nome: string;
  tipo: string;
  celular: string;
  email: string;
  caracteristicasEspeciais?: [
    {
      creci?: number,
      imovel?: string,
      procurandoImoveis?: string[]
    }
  ];
}

@Component({
  selector: 'app-list',
  imports: [
    SplitButtonModule,
    ButtonModule,
    AvatarModule,
    TagModule,
    CardModule,
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

  @for (pessoa of pessoas; track pessoa) {
   <p-card class="p-0 mt-3 mb-3 border-primary border-r-2 border-l-2">
    <div class="ng-surface-900 flex flex-col justify-between">
      <div class="flex flex-row w-full">
        <div class="flex flex-row w-full">
          <div class="flex ml-3 items-center">
            <p-avatar
            size="xlarge"
            shape="circle"
            [style]="obterCorAvatarPessoa(pessoa.tipo)"
            label="{{pessoa.nome.trim().substring(0,2)}}" />
          </div>

          <div class="flex flex-row w-full justify-between items-center ml-3">
            <div class="flex flex-wrap flex-col w-full content-start">
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{pessoa.codigo}}"
              [rounded]="true" />
            
              <h4><strong>{{pessoa.nome}}</strong></h4>
                <p-tag
                class="max-h-min max-w-min mt-2"
                value="{{pessoa.tipo}}"
                [severity]="obterCorTipoPessoa(pessoa.tipo)" />
            </div>
 
            @for (caracteristicaEspecial of pessoa.caracteristicasEspeciais; track caracteristicaEspecial) {
              <div class="flex flex-col justify-center w-full">
              <h4><strong>Informações Adicionais:</strong></h4>
              @if (pessoa.tipo === "Corretor") {
                  <p><strong>CRECI:</strong></p>
                  <p><strong>{{caracteristicaEspecial.creci?.toString()?.slice(0,2) + "." + caracteristicaEspecial.creci?.toString()?.slice(2)}}F</strong></p>
              } @else if (pessoa.tipo === "Interessado") {
                <p><strong>Procurando imóvel com:</strong></p>
                <div class="flex flex-row gap-2 flex-wrap">
                  @for (procurandoImovel of caracteristicaEspecial.procurandoImoveis; track procurandoImovel) {
                  <p-tag
                  class="max-h-min mt-2"
                  severity="warn"
                  value="{{procurandoImovel}}"
                  [rounded]="true" />
                }
                </div>
              } @else {
                <p><strong>Imóvel associado:</strong></p>
                <p><strong>{{caracteristicaEspecial.imovel}}</strong></p>
              }
            </div>
            }
        </div>

          <div class="flex border-l-2 border-r-2 mr-3 w-full">
            <div class="flex flex-col w-full items-center ml-5 w-full">
              <div class="flex flex-col justify-center">
              <h4><strong>Contato:</strong></h4>
              
              <h6 class="pi pi-whatsapp"> {{pessoa.celular}}</h6>
              
              <h6 class="pi pi-at"> {{pessoa.email}}</h6>
            </div>
          </div>
        </div>

        <div class="flex mt-2 mr-3 items-center">
          <div class="flex flex-col justify-between w-full items-end ml-5 gap-4">
            <p-button
            icon="pi pi-search"
            severity="info"
            label="Detalhes" />

            <p-button
            icon="pi pi-pencil"
            severity="warn"
            label="Editar" />

            <p-button
            icon="pi pi-trash"
            severity="danger"
            label="Apagar" />
          </div>
        </div>
      </div>
    </div>
  </div>
</p-card>
}
  `,
  styles: ``
})
export class PessoasList {
  opcoesPessoas: MenuItem[];

  pessoas: PessoaResponse[];

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

    this.pessoas = [
      {
        codigo: "060102",
        nome: "John Doe",
        tipo: "Interessado",
        celular: "(47) 91234-4321",
        email: "johndoe144@gmail.com",
        caracteristicasEspeciais: [
          { procurandoImoveis: ["2 quartos", "1 suíte", "2 banheiros"] }
        ]
      }, 
      {
        codigo: "130306",
        nome: "Unown Doe Jr.",
        tipo: "Proprietário",
        celular: "(47) 94321-1234",
        email: "unowndoejr144@hotmail.com",
        caracteristicasEspeciais: [
          { imovel: "Link (futuro link do imóvel)" }
        ]
      },
      {
        codigo: "140205",
        nome: "Jane Doe",
        tipo: "Locatário",
        celular: "(47) 98873-1212",
        email: "janedoe144@hotmail.com",
        caracteristicasEspeciais: [
          { imovel: "Link (futuro link do imóvel)" }
        ]
      },
      {
        codigo: "100101",
        nome: "Sem Nome",
        tipo: "Corretor",
        celular: "(47) 92003-8001",
        email: "semnomecorretor@gmail.com",
        caracteristicasEspeciais: [
          { creci: 12345 }
        ]
      },
    ]
  };

  obterCorTipoPessoa(tipo: string): "success" | "danger" | "contrast" | null | undefined {
    switch (tipo) {
      case "Interessado": return "success";
      case "Corretor": return "danger";
      case "Proprietário": return "contrast";
      case "Locatário": return "contrast";
      default: return undefined;
    }
  };

  obterCorAvatarPessoa(tipo: string): "background-color: var(--p-tag-success-background)" | "background-color: var(--p-tag-contrast-background); color: var(--p-tag-contrast-color)" | "background-color: var(--p-tag-danger-background)" | null | undefined {
    switch (tipo) {
      case "Interessado": return "background-color: var(--p-tag-success-background)";
      case "Corretor": return "background-color: var(--p-tag-danger-background)";
      case "Proprietário": return "background-color: var(--p-tag-contrast-background); color: var(--p-tag-contrast-color)";
      case "Locatário": return "background-color: var(--p-tag-contrast-background); color: var(--p-tag-contrast-color)";
      default: return undefined;
    }
  }
}
