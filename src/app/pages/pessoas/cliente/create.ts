import { ClienteService } from '@/services/cliente.service';
import { TipoCliente } from '@/types/cliente.types';
import { TipoContato } from '@/types/contato.types';
import { TipoImovel } from '@/types/imovel.types';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';


export interface Opcoes {
  opcao: string
}

export interface Imoveis {
  nome: string;
}

export interface TiposImoveis {
  tipo: string;
}

@Component({
  selector: 'app-create',
  imports: [
    ButtonModule,
    InputTextModule,
    SelectModule,
    InputMaskModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    CommonModule,
  ],
  template: `
  <form [formGroup]="clienteForm">

    <div class="card flex flex-col gap-4">
      <div class="font-bold text-xl">Cadastro de Cliente:</div>
      <div class="flex flex-wrap basis-0 gap-3">
        <div class="flex flex-col grow gap-2">
          <label for="">Nome Completo: <span class="text-red-500"><strong> *</strong></span></label>
          <input type="text" pInputText placeholder="Digite o nome do cliente.">
        </div>
        
        <div class="flex flex-col grow gap-2">
          <label for="campo-codigo">Código: <span class="text-red-500"><strong> *</strong></span></label>
          <input pInputText id="campo-codigo" type="text" placeholder="Digite o código de referência do cliente." />
        </div>
        
        <div class="flex flex-col basis-0 gap-2">
          <label for="">Celular: <span class="text-red-500"><strong> *</strong></span></label>
          <p-inputmask mask="(99) 99999-9999" placeholder="(00) 00000-0000" />
        </div>
        
        <div class="flex flex-col grow basis-0 gap-2">
          <label for="">E-mail: <span class="text-red-500"><strong> *</strong></span></label>
          <input type="email" pInputText placeholder="Digite o e-mail do cliente.">
        </div>
        
        <div class="flex flex-col grow basis-0 gap-2">
          <label for="">Como nos encontrou:</label>
          <p-select [options]="opcoesContato" optionLabel="opcao" optionValue="opcao" placeholder="Selecione por onde o cliente veio."/>
        </div>

      <div class="flex flex-col grow basis-0 gap-2">
        <label for="">Tipo do Cliente: <span class="text-red-500"><strong> *</strong></span></label>
        <p-select [options]="tipo" id="tipo-cliente" optionLabel="tipo" optionValue="tipo" placeholder="Selecione o tipo do cliente." [(ngModel)]="tipoClienteSelecionado"/>
      </div>
    </div>
    
    <div id="mostrar-form" class="flex flex-col gap-4">
      @switch (tipoClienteSelecionado) {
        @case ("Interessado") {
          <div id="form-interessado" class="card flex flex-col gap-4">
            <div class="font-bold text-xl">Informações Sobre o Cliente:</div>
            
            <div class="flex flex-col gap-2">
              <label for="">O que está Procurando? <span class="text-red-500"><strong> *</strong></span></label>
              <p-select [options]="tipoImovel" optionLabel="tipo" optionValue="tipo" placeholder="Selecione a opção desejada." [(ngModel)]="tipoSelecionado"/>
            </div>
            
            <div class="text-xl font-bold">Valores:</div>
            <div class="flex flex-wrap gap-2">
              
              <div class="flex flex-col grow gap-2">
                <label for="">Orçamento: <span class="text-red-500"><strong> *</strong></span></label>
                <p-inputnumber mode="currency" placeholder="Orçamento do cliente." currency="BRL" locale="pt-BR" />
              </div>
              
              <div class="flex flex-col grow gap-2">
                <label for="">Orçamento Mínimo:</label>
                <p-inputnumber mode="currency" placeholder="Valor mínimo do orçamento do cliente." currency="BRL" locale="pt-BR" />
              </div>
              
              <div class="flex flex-col grow gap-2">
                <label for="">Orçamento Máximo:</label>
                <p-inputnumber mode="currency" placeholder="Valor máximo do orçamento do cliente." currency="BRL" locale="pt-BR" />
              </div>
            </div>
            
            <div class="flex flex-col gap-2">
              <div class="font-bold text-xl">Preferências:</div>
              
              <div class="flex flex-wrap gap-6">
                <div class="flex flex-col grow basis-0 gap-2">
                  <label for="campo-quartos">Quantidade de Quartos:</label>
                  <p-inputnumber
                  id="campo-quartos" 
                  placeholder="Digite a quantidade de quartos." />
                </div>
                
                <div class="flex flex-col grow basis-0 gap-2">
                  <label for="campo-suites">Sendo Suítes:</label>
                  <p-inputnumber
                  id="campo-suites"
                  placeholder="Digite a quantidade de suítes." />
                </div>
                
                <div class="flex flex-col grow basis-0 gap-2">
                  <label for="campo-banheiro">Quantidade de Banheiros:</label>
                  <p-inputnumber
                  id="campo-banheiro" 
                  placeholder="Digite a quantidade de banheiros." />
                </div>
                
                <div class="flex flex-col grow basis-0 gap-2">
                  <label for="campo-vagas">Vagas de Garagem:</label>
                  <p-inputnumber 
                  id="campo-vagas"
                  placeholder="Digite a quantidade de vagas de garagem." />
                </div>
                
                <div class="flex flex-col grow basis-0 gap-2">
                  <label for="campo-andares">Andares:</label>
          <p-inputnumber 
          id="campo-andares"
          placeholder="Digite a quantidade de andares." />
        </div>
        
        <div class="flex flex-col grow basis-0 gap-2">
          <label for="campo-salas">Quantidade de Salas:</label>
          <p-inputnumber
          id="campo-salas" 
          placeholder="Digite a quantidade de salas." />
        </div>
      </div>
    </div>
  </div>
  
  <div class="flex justify-end">
    <p-button
    severity="success"
    icon="pi pi-save"
    label="Salvar"
    (click)="salvar()" />
  </div>
}
@case ("Proprietário") {
  <div class="flex card gap-2 flex-col">
    <div class="flex flex-col grow basis-0 gap-4">
      <div class="text-xl font-bold">Informações Adicionais:</div>
      
      <label for="">Imóvel do Responsável:</label>
      <div class="flex flex-row">
        <p-select [options]="imoveis" optionLabel="nome" optionValue="nome" placeholder="Selecione o imóvel." fluid />
        <p-button
        severity="primary"
        icon="pi pi-plus" />
      </div>
    </div>
  </div>
  
    <div class="flex justify-end">
      <p-button
      severity="success"
      icon="pi pi-save"
      label="Salvar"
      (click)="salvar()" />
    </div>
          }
          @case ("Locatário") {
            <div class="flex card gap-2 flex-col">
              <div class="flex flex-col grow basis-0 gap-4">
                <div class="text-xl font-bold">Informações Adicionais:</div>
                
          <label for="">Imóvel do Responsável:</label>
          <div class="flex flex-row">
            <p-select [options]="imoveis" optionLabel="nome" optionValue="nome" placeholder="Selecione o imóvel." fluid />
            <p-button
            severity="primary"
            icon="pi pi-plus" />
            </div>
          </div>
        </div>
        
        <div class="flex justify-end">
          <p-button
          severity="success"
          icon="pi pi-save"
          label="Salvar"
          (click)="salvar()" />
        </div>
      }
      @default {
      }
    }
    </div>
  </div>
</form>
`,
styles: ``
})
export class ClienteCreate {
  opcoesContato: TipoContato[] | undefined;

  tipo: TipoCliente[] | undefined;

  tipoClienteSelecionado: TipoCliente | undefined;

  imoveis: Imoveis[] | undefined;

  tipoImovel: TipoImovel[] | undefined;

  tipoSelecionado: TipoImovel | undefined;

  private readonly formBuilder = inject(FormBuilder);
  private readonly clienteService = inject(ClienteService);
  private readonly messageService = inject(MessageService);

  clienteForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    como_encontrou: ['', [Validators.required]],
    tipo: ['', [Validators.required]],

    dados_adicionais: this.formBuilder.group({})
  })

  constructor(
    private router: Router
  ) {

  }

  salvar() {
    this.router.navigate(["/pages/pessoas"])
  }

  criarFormInteressado() : FormGroup {
    return this.formBuilder.group({
      tipo_imovel: ['', [Validators.required]],
      orcamento: [null, [Validators.required]],
      orcamento_minimo: [null],
      orcamento_maximo: [null],
      quantidade_quartos: [null],
      quantidade_suites: [null],
      quantidade_banheiros: [null],
      quantidade_vagas_garagem: [null],
      quantidade_andares: [null],
      quantidade_salas: [null]
    })
  }

  criarFormProprietario() : FormGroup {
    return this.formBuilder.group({
      imovel_associado: [null, [Validators.required]]
    })
  }

  criarFormLocatario() : FormGroup {
    return this.formBuilder.group({
      imovel_associado: [null, [Validators.required]]
    })
  }

  ngOnInit() {
    this.imoveis = [
      {nome: "Imoveis cadastrados"}
    ];
  };
}
