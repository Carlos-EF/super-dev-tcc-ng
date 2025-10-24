import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

export interface Opcoes {
  opcao: string
}

export interface TipoCliente {
  tipo: string
}

@Component({
  selector: 'app-create',
  imports: [
    ButtonModule,
    InputTextModule,
    SelectModule,
    InputMaskModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputNumberModule,
  ],
  template: `
  <div class="card flex flex-col gap-4">
    <div class="font-bold text-xl">Cadastro de Cliente:</div>
    <div class="flex flex-wrap basis-0 gap-3">
      <div class="flex flex-col grow gap-2">
        <label for="">Nome Completo:</label>
        <input type="text" pInputText>
      </div>

      <div class="flex flex-col basis-0 gap-2">
        <label for="">Celular:</label>
        <p-inputmask mask="(99) 99999-9999" placeholder="(00) 00000-0000" />
      </div>
          
      <div class="flex flex-col grow basis-0 gap-2">
        <label for="">Email:</label>
        <input type="email" pInputText>
      </div>

      <div class="flex flex-col grow basis-0 gap-2">
        <label for="">Como nos encontrou:</label>
        <p-select [options]="opcoesContato" optionLabel="opcao" optionValue="opcao" placeholder="Selecione por onde o cliente veio."/>
      </div>

      <div class="flex flex-col grow basis-0 gap-2">
        <label for="">Tipo do Cliente:</label>
        <p-select [options]="tipo" optionLabel="tipo" optionValue="tipo" placeholder="Selecione o tipo do cliente." [(ngModel)]="tipoClienteSelecionado"/>
      </div>
    </div>
  </div>
  <!-- Modelo do form para prorietário/locatário -->
  <div class="flex card gap-2 flex-col">
    <div class="flex flex-col grow basis-0 gap-2">
        <div class="text-xl font-bold">Informações Adicionais:</div>

        <label for="">Imóvel do Responsável:</label>
        <div class="flex flex-row">
        <!-- Puxar lista de imóveis cadastrado / deixar que a pessoa cadastre um imóvel de forma rápida -->
           <p-select [options]="tipo" optionLabel="tipo" optionValue="tipo" placeholder="Selecione o imóvel." [(ngModel)]="tipoClienteSelecionado" fluid />
           <p-button
           severity="primary"
           icon="pi pi-plus" />
          </div>
     </div>
   </div>
  <!-- Modelo do form para prorietário/locatário -->

  <!-- Modelo do form para interessado -->
  <div class="card flex flex-col grow basis-0 gap-3">
    <div class="font-bold text-xl">Informações Sobre o Cliente:</div>

    <div class="flex flex-col gap-2">
      <label for="">O que está Procurando?</label>
      <p-select [options]="tipo" optionLabel="tipo" optionValue="tipo" placeholder="Selecione a opção desejada." [(ngModel)]="tipoClienteSelecionado"/>
    </div>

    <div class="flex flex-col gap-2">
      <label for="">Orçamento Mínimo:</label>
      <p-inputnumber mode="currency" currency="BRL" locale="pt-BR" />
    </div>

    <div class="flex flex-col gap-2">
      <label for="">Orçamento Máximo:</label>
      <p-inputnumber mode="currency" currency="BRL" locale="pt-BR" />
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

  <div class="flex justify-end">
    <p-button
    severity="success"
    icon="pi pi-save"
    label="Salvar"
    (click)="salvar()" />
  </div>
  `,
  styles: ``
})
export class ClienteCreate {
  opcoesContato: Opcoes[] | undefined;

  tipo: TipoCliente[] | undefined;

  tipoClienteSelecionado: TipoCliente | undefined;

  constructor(
    private router: Router
  ) { }

  salvar() {
    this.router.navigate(["/pages/pessoas"])
  }

  ngOnInit() {
    this.opcoesContato = [
      {opcao: "WhatsApp"},
      {opcao: "Anúncio"},
      {opcao: "Contato Direto"},
      {opcao: "Instagram"},
    ];

    this.tipo = [
      {tipo: "Interessado"},
      {tipo: "Proprietário"},
      {tipo: "Locatário"},
    ];
   }
}
