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
import { StatusButton } from "@/layout/component/action buttons/status-button";
import { DeleteButton } from "@/layout/component/action buttons/delete-button";
import { DialogModule } from 'primeng/dialog';
import { MoreDetailsButton } from "@/layout/component/action buttons/more-details-button";

@Component({
  selector: 'app-list',
  imports: [
    SplitButton,
    ButtonModule,
    AvatarModule,
    TagModule,
    CardModule,
    EditButton,
    RouterLink,
    StatusButton,
    DialogModule,
    DeleteButton,
    MoreDetailsButton
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
              <p><strong>{{corretor.creci}}</strong></p>
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
              <status-button [status]="corretor.status" (click)="confirmarInativacao(corretor)"/>
              <edit-button routerLink="corretor/editar/{{corretor.id}}"/>
              <delete-button (click)="confirmarApagarCorretor(corretor)"/>
              <more-details-button (click)="showDialog(corretor)"/>
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
              <p><strong>{{corretor.creci}}</strong></p>
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
              <status-button [status]="corretor.status" (click)="confirmarAtivacao(corretor)"/>
              <delete-button (click)="confirmarApagarCorretor(corretor)"/>
            </div>
          </div>
        </div>
      </div>
  </p-card>
  }
}

<p-dialog 
  header="Dados do Corretor" 
  [modal]="true" 
  [(visible)]="visible" 
  [style]="{width: '50rem'}"
>

  @if (corretorSelecionado) {
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-4 border-b pb-4">
        <p-avatar
        size="xlarge"
        shape="circle"
        [style]="obterCorAvatarPessoa(corretorSelecionado.tipo)"
        [label]="corretorSelecionado.nome_completo.trim().substring(0, 2)"
        />
        
        <div>
          <h2 class="text-xl font-bold">
            {{corretorSelecionado.nome_completo}}
          </h2>
          
          <p-tag
          [value]="corretorSelecionado.tipo"
          [severity]="obterCorTipoPessoa(corretorSelecionado.tipo)"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <strong>Código:</strong>
          <p>{{corretorSelecionado.codigo}}</p>
        </div>
        
      <div>
        <strong>CRECI:</strong>
        <p>{{corretorSelecionado.creci}}</p>
      </div>
      
      <div>
        <strong>Celular:</strong>
        <p>{{corretorSelecionado.celular}}</p>
      </div>
      
      <div>
        <strong>E-mail:</strong>
        <p>{{corretorSelecionado.email}}</p>
      </div>
    </div>
      
      <div class="grid grid-cols-2 gap-4 border-t pt-4">
        <div>
          <strong>Data de nascimento:</strong>
          @if (corretorSelecionado.dataNascimento) {
            <p>{{corretorSelecionado.dataNascimento}}</p>
          } @else {
            <p class="text-gray-400">Dado não cadastrado.</p>
          }
        </div>
        
        <div>
          <strong>RG:</strong>
          @if (corretorSelecionado.rg) {
            <p>{{corretorSelecionado.rg}}</p>
          } @else {
            <p class="text-gray-400">Dado não cadastrado.</p>
          }
        </div>
        
        <div>
          <strong>CPF:</strong>
          @if (corretorSelecionado.cpf) {
            <p>{{corretorSelecionado.cpf}}</p>
          } @else {
            <p class="text-gray-400">Dado não cadastrado.</p>
          }
        </div>
      </div>
  </div>
  }
  
</p-dialog>
`,
styles: ``
})
export class PessoasList {
  private readonly corretorService = inject(CorretorService);

  private readonly messageService = inject(MessageService);

  private readonly confirmationService = inject(ConfirmationService);

  opcoesPessoas: MenuItem[];

  corretores = model<CorretorResponse[]>([]);

  visible: boolean = false;

  corretorSelecionado: any = null;

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

  showDialog(corretor: CorretorResponse) {
    this.corretorSelecionado = corretor
    this.visible = true;
  }

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

  confirmarAtivacao(corretor: CorretorResponse) {
    this.confirmationService.confirm({
      header: 'ATENÇÂO!',
      message: `Deseja ativar o corretor : ${corretor.nome_completo}?`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Ativar',
        severity: 'primary',
        icon: 'pi pi-check'
      },
      accept: () => {
        this.ativarCorretor(corretor.id);
      },
      reject: () => {}
    })
  }

  confirmarInativacao(corretor: CorretorResponse) {
    this.confirmationService.confirm({
      header: 'ATENÇÂO!',
      message: `Deseja inativar o corretor : ${corretor.nome_completo}?`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Inativar',
        severity: 'primary',
        icon: 'pi pi-check'
      },
      accept: () => {
        this.desativarCorretor(corretor.id);
      },
      reject: () => {}
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

  desativarCorretor(id: string) {
    this.corretorService.deactivate(id).subscribe({
      next:() => {
        this.messageService.add({
          severity: 'success',
          summary: 'SUCESSO!',
          detail: 'Corretor desativado com sucesso!'
        });
        this.buscarCorretores();
      },
      error:(erro: Error) => {
        console.log(`Ocorreu um erro ao tentar desativar o corretor: ${erro}`);
        this.messageService.add({
          severity:'error',
          summary:'ERRO (CORRETORES).',
          detail: 'Ocorreu um erro ao tentar desativar o corretor.'
        })
      }
    })
  }

  confirmarApagarCorretor(corretor: CorretorResponse) {
      this.confirmationService.confirm({
      header: 'ATENÇÂO!',
      message: `Deseja apagar o corretor: ${corretor.nome_completo}?`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Apagar',
        severity: 'primary',
        icon: 'pi pi-check'
      },
      accept: () => {
        this.apagarCorretor(corretor.id);
      },
    })
  }

  apagarCorretor(id: string) {
    this.corretorService.delete(id).subscribe({
      next:() => {
        this.messageService.add({
          severity: 'success',
          summary: 'SUCESSO!',
          detail: 'Corretor apagado com sucesso!'
        });
        this.buscarCorretores();
      },
      error: (erro: Error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'ERRO (CORRETORES).',
          detail: 'Ocorreru um erro ao tentar apagar o corretor.'
        });
        console.log(`Ocorreu um erro ao tentar apagar o corretor: ${erro}.`);
        
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
