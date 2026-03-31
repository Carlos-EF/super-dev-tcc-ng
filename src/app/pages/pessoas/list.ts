import { Component, model } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitButton } from 'primeng/splitbutton';
import { TagModule } from 'primeng/tag';
import { EditButton } from "@/layout/component/action buttons/edit-button";
import { Router, RouterLink } from '@angular/router';

export interface CorretorResponse {
  id: string;
  status: string;
  codigo: string;
  nome_completo: string;
  tipo: string;
  celular: string;
  email: string;
  creci: string;
  data_nascimento?: string;
  rg?: string;
  cpf?: string;
}

@Component({
  selector: 'app-list',
  imports: [
    SplitButton,
    ButtonModule,
    AvatarModule,
    TagModule,
    CardModule,
    EditButton,
    RouterLink
],

  template: `
  <div class="flex justify-end">
    <p-splitbutton
    #Teste
    severity="success"
    icon="pi pi-plus"
    label="Cadastrar"
    [model]="opcoesPessoas" /> 
  </div>

  @for (pessoa of pessoas; track pessoa) {
    @if (pessoa.status == "ATIVO") {
      <p-card class="p-0 mt-3 mb-3 border-primary border-r-2 border-l-2">
        <div class="ng-surface-900 flex flex-col justify-between">
          <div class="flex flex-row w-full">
            <div class="flex flex-row w-full">
              <div class="flex ml-3 items-center">
                <p-avatar
            size="xlarge"
            shape="circle"
            [style]="obterCorAvatarPessoa(pessoa.tipo)"
            label="{{pessoa.nome_completo.trim().substring(0,2)}}" />
          </div>
          
          <div class="flex flex-row w-full justify-between items-center ml-3">
            <div class="flex flex-wrap flex-col w-full content-start">
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{pessoa.codigo}}"
              [rounded]="true" />
              
              <h4><strong>{{pessoa.nome_completo}}</strong></h4>
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{pessoa.tipo}}"
              [severity]="obterCorTipoPessoa(pessoa.tipo)" />
            </div>
            
            
            <div class="flex flex-col justify-center w-full">
              <h4><strong>Informações Adicionais:</strong></h4>
              <p><strong>CRECI:</strong></p>
              <p><strong>{{pessoa.creci}}F</strong></p>
            </div>
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
              <edit-button routerLink="corretor/editar/{{pessoa.id}}"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </p-card>
} @else if (pessoa.status == "INATIVO") {
  <p-card class="p-0 mt-3 mb-3 border-gray-900 border-r-2 border-l-2">
        <div class="ng-surface-900 flex flex-col justify-between">
          <div class="flex flex-row w-full">
            <div class="flex flex-row w-full opacity-50">
              <div class="flex ml-3 items-center">
                <p-avatar
                  size="xlarge"
                  shape="circle"
                  [style]="obterCorAvatarPessoa(pessoa.tipo)"
                  label="{{pessoa.nome_completo.trim().substring(0,2)}}" />
              </div>
          
          <div class="flex flex-row w-full justify-between items-center ml-3">
            <div class="flex flex-wrap flex-col w-full content-start">
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{pessoa.codigo}}"
              [rounded]="true" />
              
              <h4><strong>{{pessoa.nome_completo}}</strong></h4>
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{pessoa.tipo}}"
              [severity]="obterCorTipoPessoa(pessoa.tipo)" />
            </div>
            
            
            <div class="flex flex-col justify-center w-full">
              <h4><strong>Informações Adicionais:</strong></h4>
              <p><strong>CRECI:</strong></p>
              <p><strong>{{pessoa.creci}}F</strong></p>
            </div>
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
        </div>

          <div class="flex mt-2 mr-3 items-center">
            <div class="flex flex-col justify-between w-full items-end ml-5 gap-4 ">
              <edit-button routerLink="corretor/editar/{{pessoa.id}}"/>
            </div>
          </div>
        </div>
      </div>
  </p-card>
  }
}
  `,
  styles: ``
})
export class PessoasList {
  opcoesPessoas: MenuItem[];

  pessoas: CorretorResponse[];

  constructor(
    private router : Router
  ) {
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
      },
    ];

    this.pessoas = [
      {
        id: "019d43e8-4317-78c2-8cc0-02863c1c3c38",
        status: "ATIVO",
        codigo: "100101",
        tipo: "Corretor",
        nome_completo: "Sem Nome",
        celular: "(47) 92003-8001",
        email: "semnomecorretor@gmail.com",
        creci: "12345",
      },
      {
        id: "019d43e8-76f8-7858-8e31-32d7d8af1a01",
        status: "INATIVO",
        codigo: "100102",
        tipo: "Corretor",
        nome_completo: "Sem Nome 2.0",
        celular: "(47) 92003-8001",
        email: "semnomecorretor2@gmail.com",
        creci: "54321",
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
