import { Component, inject, model } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SplitButton } from 'primeng/splitbutton';
import { TagModule } from 'primeng/tag';
import { EditButton } from "@/layout/component/action buttons/edit-button";
import { Router, RouterLink } from '@angular/router';
import { CorretorResponse } from '@/models/corretor.model';
import { CorretorService } from '@/services/corretor.service';

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

  @for (corretor of corretores(); track corretor) {
    @if (corretor.status == "ATIVO") {
      <p-card class="p-0 mt-3 mb-3 border-primary border-r-2 border-l-2">
        <div class="ng-surface-900 flex flex-col justify-between">
          <div class="flex flex-row w-full">
            <div class="flex flex-row w-full">
              <div class="flex ml-3 items-center">
                <p-avatar
            size="xlarge"
            shape="circle"
            [style]="obterCorAvatarPessoa(corretor.tipo)"
            label="{{corretor.nome_completo.trim().substring(0,2)}}" />
          </div>
          
          <div class="flex flex-row w-full justify-between items-center ml-3">
            <div class="flex flex-wrap flex-col w-full content-start">
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{corretor.codigo}}"
              [rounded]="true" />
              
              <h4><strong>{{corretor.nome_completo}}</strong></h4>
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{corretor.tipo}}"
              [severity]="obterCorTipoPessoa(corretor.tipo)" />
            </div>
            
            
            <div class="flex flex-col justify-center w-full">
              <h4><strong>Informações Adicionais:</strong></h4>
              <p><strong>CRECI:</strong></p>
              <p><strong>{{corretor.creci}}F</strong></p>
            </div>
          </div>
          
          <div class="flex border-l-2 border-r-2 mr-3 w-full">
            <div class="flex flex-col w-full items-center ml-5 w-full">
              <div class="flex flex-col justify-center">
                <h4><strong>Contato:</strong></h4>     
                <h6 class="pi pi-whatsapp"> {{corretor.celular}}</h6>
                
                <h6 class="pi pi-at"> {{corretor.email}}</h6>
              </div>
            </div>
          </div>
          
          <div class="flex mt-2 mr-3 items-center">
            <div class="flex flex-col justify-between w-full items-end ml-5 gap-4">
              <edit-button routerLink="corretor/editar/{{corretor.id}}"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </p-card>
} @else if (corretor.status == "INATIVO") {
  <p-card class="p-0 mt-3 mb-3 border-gray-900 border-r-2 border-l-2">
        <div class="ng-surface-900 flex flex-col justify-between">
          <div class="flex flex-row w-full">
            <div class="flex flex-row w-full opacity-50">
              <div class="flex ml-3 items-center">
                <p-avatar
                  size="xlarge"
                  shape="circle"
                  [style]="obterCorAvatarPessoa(corretor.tipo)"
                  label="{{corretor.nome_completo.trim().substring(0,2)}}" />
              </div>
          
          <div class="flex flex-row w-full justify-between items-center ml-3">
            <div class="flex flex-wrap flex-col w-full content-start">
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{corretor.codigo}}"
              [rounded]="true" />
              
              <h4><strong>{{corretor.nome_completo}}</strong></h4>
              <p-tag
              class="max-h-min max-w-min mt-2"
              value="{{corretor.tipo}}"
              [severity]="obterCorTipoPessoa(corretor.tipo)" />
            </div>
            
            
            <div class="flex flex-col justify-center w-full">
              <h4><strong>Informações Adicionais:</strong></h4>
              <p><strong>CRECI:</strong></p>
              <p><strong>{{corretor.creci}}F</strong></p>
            </div>
          </div>
          
          <div class="flex border-l-2 border-r-2 mr-3 w-full">
            <div class="flex flex-col w-full items-center ml-5 w-full">
              <div class="flex flex-col justify-center">
                <h4><strong>Contato:</strong></h4>     
                <h6 class="pi pi-whatsapp"> {{corretor.celular}}</h6>
                
                <h6 class="pi pi-at"> {{corretor.email}}</h6>
              </div>
            </div>
          </div>
        </div>

          <div class="flex mt-2 mr-3 items-center">
            <div class="flex flex-col justify-between w-full items-end ml-5 gap-4 ">
              <edit-button routerLink="corretor/editar/{{corretor.id}}"/>
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
  private readonly corretorService = inject(CorretorService);

  private readonly messageService = inject(MessageService);

  private readonly confirmationService = inject(ConfirmationService);

  opcoesPessoas: MenuItem[];

  corretores = model<CorretorResponse[]>([]);

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

    this.buscarCorretores();
  };

  buscarCorretores() {
    this.corretorService.getAll().subscribe({
      next:(corretores: CorretorResponse[]) => {
        this.corretores.set(corretores);
      },
      error:(erro: Error) => {
        console.log(`Ocorreu um erro ao carregar os corretores: ${erro}`);
        this.messageService.add({
          severity: 'error',
          summary: 'ERRO (CORRETORES).',
          detail: 'Ocorreu um erro ao tentar carregar os corretores cadastrados.'
        })
      }
    })
  }

  ativarCorretor(id: string) {
    this.corretorService.activate(id).subscribe({
      next:() => {
          this.messageService.add({
          severity: 'success',
          summary: 'SUCESSO!',
          detail: 'Corretor ativado com sucesso!'
        });
        this.buscarCorretores();
      },
      error:(erro: Error) => {
        console.log(`Ocorreu um erro ao tentar ativar o corretor: ${erro}`);
          this.messageService.add({
          severity: 'error',
          summary: 'ERRO (CORRETORES).',
          detail: 'Ocorreu um erro ao tentar ativar o corretor.'
        })
      }
    })
  }
  

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
