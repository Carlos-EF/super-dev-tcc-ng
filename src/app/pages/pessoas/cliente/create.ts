import {  CriarClienteRequest, CriarDadosAdicionais } from '@/models/cliente.model';
import { ClienteService } from '@/services/cliente.service';
import {  TIPOS_CLIENTE } from '@/types/cliente.types';
import { TIPOS_CONTATO } from '@/types/contato.types';
import {  TIPOS_IMOVEL } from '@/types/imovel.types';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';


export interface Imoveis {
  nome: string;
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
          <input type="text" pInputText placeholder="Digite o nome do cliente." formControlName="nome" />
        </div>
        
        <div class="flex flex-col grow gap-2">
          <label for="campo-codigo">Código: <span class="text-red-500"><strong> *</strong></span></label>
          <input pInputText id="campo-codigo" type="text" placeholder="Digite o código de referência do cliente." formControlName="codigo" />
        </div>
        
        <div class="flex flex-col basis-0 gap-2">
          <label for="">Celular: <span class="text-red-500"><strong> *</strong></span></label>
          <p-inputmask mask="(99) 99999-9999" placeholder="(00) 00000-0000" formControlName="celular" />
        </div>
        
        <div class="flex flex-col grow basis-0 gap-2">
          <label for="">E-mail: <span class="text-red-500"><strong> *</strong></span></label>
          <input type="email" pInputText placeholder="Digite o e-mail do cliente." formControlName="email">
        </div>
        
        <div class="flex flex-col gap-2">
          <label for="">Como nos encontrou:</label>
          <p-select [options]="tiposContato" placeholder="Selecione por onde o cliente veio." formControlName="como_encontrou" fluid/>
        </div>

      <div class="flex flex-col grow basis-0 gap-2">
        <label for="">Tipo do Cliente: <span class="text-red-500"><strong> *</strong></span></label>
        <p-select [options]="tiposCliente" id="tipo-cliente" placeholder="Selecione o tipo do cliente." formControlName="tipo"/>
      </div>
    </div>
    
    <div id="mostrar-form" class="flex flex-col gap-4">
      @switch (clienteForm.get("tipo")?.value) {
        @case ("Interessado") {
          <form [formGroup]="dadosAdicionaisForm">
            <div id="form-interessado" class="card flex flex-col gap-4">
              <div class="font-bold text-xl">Informações Sobre o Cliente:</div>
              
              <div class="flex flex-col gap-2">
                <label for="">O que está Procurando? <span class="text-red-500"><strong> *</strong></span></label>
                <p-select [options]="tiposImovel" placeholder="Selecione a opção desejada." formControlName="procurando"/>
              </div>
              
              <div class="text-xl font-bold">Valores:</div>
              <div class="flex flex-wrap gap-2">
                
                <div class="flex flex-col grow gap-2">
                  <label for="">Orçamento: <span class="text-red-500"><strong> *</strong></span></label>
                  <p-inputnumber mode="currency" placeholder="Orçamento do cliente." currency="BRL" locale="pt-BR" formControlName="orcamento" />
                </div>
                
                <div class="flex flex-col grow gap-2">
                  <label for="">Orçamento Mínimo:</label>
                  <p-inputnumber mode="currency" placeholder="Valor mínimo do orçamento do cliente." currency="BRL" locale="pt-BR" formControlName="orcamento_minimo"/>
                </div>
                
                <div class="flex flex-col grow gap-2">
                  <label for="">Orçamento Máximo:</label>
                  <p-inputnumber mode="currency" placeholder="Valor máximo do orçamento do cliente." currency="BRL" locale="pt-BR" formControlName="orcamento_maximo"/>
                </div>
              </div>
              
              <div class="flex flex-col gap-2">
                <div class="font-bold text-xl">Preferências:</div>
                
                <div class="flex flex-wrap gap-6">
                  <div class="flex flex-col grow basis-0 gap-2">
                    <label for="campo-quartos">Quantidade de Quartos:</label>
                    <p-inputnumber
                    id="campo-quartos" 
                    placeholder="Digite a quantidade de quartos." formControlName="quantidade_quartos"/>
                  </div>
                  
                  <div class="flex flex-col grow basis-0 gap-2">
                    <label for="campo-suites">Sendo Suítes:</label>
                    <p-inputnumber
                    id="campo-suites"
                    placeholder="Digite a quantidade de suítes." formControlName="quantidade_suites"/>
                  </div>
                  
                  <div class="flex flex-col grow basis-0 gap-2">
                    <label for="campo-banheiro">Quantidade de Banheiros:</label>
                    <p-inputnumber
                    id="campo-banheiro" 
                    placeholder="Digite a quantidade de banheiros." formControlName="quantidade_banheiros"/>
                  </div>
                  
                  <div class="flex flex-col grow basis-0 gap-2">
                    <label for="campo-vagas">Vagas de Garagem:</label>
                    <p-inputnumber 
                  id="campo-vagas"
                  placeholder="Digite a quantidade de vagas de garagem." formControlName="quantidade_vagas"/>
                </div>
                
                <div class="flex flex-col grow basis-0 gap-2">
                  <label for="campo-andares">Andares:</label>
                  <p-inputnumber 
                  id="campo-andares"
                  placeholder="Digite a quantidade de andares." formControlName="quantidade_andares"/>
                </div>
                
                <div class="flex flex-col grow basis-0 gap-2">
                  <label for="campo-salas">Quantidade de Salas:</label>
                  <p-inputnumber
                  id="campo-salas" 
                  placeholder="Digite a quantidade de salas." formControlName="quantidade_salas"/>
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
      </form>
       }
        @case ("Proprietário") {
          <form [formGroup]="dadosAdicionaisForm">
          <div class="flex card gap-2 flex-col">
            <div class="flex flex-col grow basis-0 gap-4">
              <div class="text-xl font-bold">Informações Adicionais:</div>
              
              <label for="">Imóvel do Responsável:</label>
              <div class="flex flex-row">
                <p-select [options]="imoveis" optionLabel="nome" optionValue="nome" placeholder="Selecione o imóvel." fluid formControlName="imovel_associado" />
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
          </form>
      }
        @case ("Locatário") {
        <form [formGroup]="dadosAdicionaisForm">
          <div class="flex card gap-2 flex-col">
            <div class="flex flex-col grow basis-0 gap-4">
            <div class="text-xl font-bold">Informações Adicionais:</div>
              
          <label for="">Imóvel do Responsável:</label>
          <div class="flex flex-row">
            <p-select [options]="imoveis" optionLabel="nome" optionValue="nome" placeholder="Selecione o imóvel." fluid formControlName="imovel_associado" />
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
    </form>
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
  tiposContato = [...TIPOS_CONTATO];

 tiposCliente = [...TIPOS_CLIENTE];

  imoveis: Imoveis[] | undefined;

  tiposImovel = [...TIPOS_IMOVEL];

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
  })

  dadosAdicionaisForm = this.formBuilder.group({});

  constructor(
    private router: Router
  ) {

  }

  salvar() {
    const formCliente: CriarClienteRequest = {
      nome: this.clienteForm.getRawValue().nome!,
      codigo: this.clienteForm.getRawValue().codigo!,
      celular: this.clienteForm.getRawValue().celular!,
      email: this.clienteForm.getRawValue().email!,
      tipo: this.clienteForm.getRawValue().tipo!,
      como_encontrou: this.clienteForm.getRawValue().como_encontrou!
    };

    const formDadosAdicionais = this.dadosAdicionaisForm.getRawValue() as CriarDadosAdicionais;

    this.cadastrar(formCliente, formDadosAdicionais);
  }

  cadastrar(form: CriarClienteRequest, dadosAdicionais: CriarDadosAdicionais) {
    this.clienteService.create(
      form, 
      dadosAdicionais
    ).subscribe({
      next: () => {
        const tipoCliente = this.clienteForm.getRawValue().tipo;

        this.clienteForm.reset();
        this.messageService.add({
          severity: "success",
          summary: "SUCESSO!",
          detail: `Cliente do tipo ${tipoCliente} cadastrado com êxito!`
        });
        this.router.navigate(["/pages/pessoas"]);
      },
      error: (erro: Error) => {
        console.log(`Ocorreu um erro ao tentar cadastrar o cliente: ${erro}`);
                this.messageService.add({
          severity: "error",
          summary: "FALHA NO CADASTRO!",
          detail: "Ocorreu um erro ao tentar cadastrar o cliente."
        });
      }
    })
  }
  


  alterarFormularioDadosAdicionais(tipo: string | null): void {
    if (tipo === "Interessado") {
      this.dadosAdicionaisForm = this.criarFormInteressado();
    }
    else if (tipo === "Proprietário") {
      this.dadosAdicionaisForm = this.criarFormProprietario();
    }
    else if (tipo === "Locatário") {
      this.dadosAdicionaisForm = this.criarFormLocatario();
    }
  }

  criarFormInteressado() : FormGroup {
    return this.formBuilder.group({
      procurando: ['', [Validators.required]],
      orcamento: [null, [Validators.required]],
      orcamento_minimo: [null],
      orcamento_maximo: [null],
      quantidade_quartos: [null],
      quantidade_suites: [null],
      quantidade_banheiros: [null],
      quantidade_vagas: [null],
      quantidade_andares: [null],
      quantidade_salas: [null]
    })
  }

  criarFormProprietario() : FormGroup {
    return this.formBuilder.group({
      imovel_associado: ['', [Validators.required]]
    })
  }

  criarFormLocatario() : FormGroup {
    return this.formBuilder.group({
      imovel_associado: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.imoveis = [
      {nome: "Imoveis cadastrados"}
    ];

    this.clienteForm
    .get("tipo")
    ?.valueChanges
    .subscribe(tipo => {
      this.alterarFormularioDadosAdicionais(tipo);
    });
  }
}
