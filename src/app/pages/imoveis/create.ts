import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FINALIDADES } from '@/types/finalidade.types';
import { TIPOS_IMOVEL } from '@/types/imovel.types';
import { CorretorService } from '@/services/corretor.service';
import { ClienteService } from '@/services/cliente.service';
import { ClienteResponse, CriarClienteRequest, CriarDadosAdicionais } from '@/models/cliente.model';
import { CorretorCriarRequest, CorretorResponse } from '@/models/corretor.model';
import { DialogModule } from 'primeng/dialog';
import { TIPO_CLIENTE_MODAL } from '@/types/cliente.types';
import { TIPOS_CONTATO } from '@/types/contato.types';
import { CepService } from '@/services/cep.service';
import { ConsultaCepResponse } from '@/models/consulta.cep.model';

// Trocar no futuro

export interface Finalidades {
  nome: string
}

export interface TiposImoveis {
  nome: string
}

export interface ValidarCondominio {
  resposta: string
}

export interface ValidarMobilia {
  resposta: string
}

@Component({
  selector: 'app-create',
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    InputMaskModule,
    ButtonModule,
    StepperModule,
    InputNumberModule,
    ToastModule,
    FileUploadModule,
    DialogModule,
  ],
  template: `
  <p-toast/>
  <div class="card flex justify-center">
    <p-stepper [value]="1" class="grow basis-0 gap-2 surface-0">
      <p-step-list>
        <p-step [value]="1">Dados Do Imóvel</p-step>
        <p-step [value]="2">Valor e Características</p-step>
        <p-step [value]="3">Fotos e Finalização</p-step>
      </p-step-list>
     <p-step-panels>
       <p-step-panel [value]="1">
          <ng-template #content let-activateCallback="activateCallback">
            <div class="flex flex-col">
    <div>
      <div class="card flex flex-col gap-4">
        <div class="font-semibold text-xl">Responsáveis:</div>

          <div class="flex flex-wrap gap-6">
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-proprietario">Proprietário: <span class="text-red-500"><strong> *</strong></span></label>
              <div class="flex flex-row">
              <p-select 
              [options]="proprietarios" 
              [checkmark]="true" 
              [showClear]="true" 
              placeholder="Selecione o proprietário."
              class="w-full"/>
              <p-button 
              icon="pi pi-plus"
              (click)="abrirModalProprietario()" 
               />
             </div>
            </div>

          <div class="flex flex-col grow basis-0 gap-2">
            <label for="campo-corretor">Corretor: <span class="text-red-500"><strong> *</strong></span></label>
            <div class="flex flex-row">
            <p-select 
            [options]="corretores" 
            [checkmark]="true" 
            [showClear]="true" 
            placeholder="Selecione o corretor."
            class="w-full"/>
            <p-button 
            icon="pi pi-plus"
            (click)="abrirModalCorretor()" 
             />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div>
      <div class="card flex flex-col gap-4 mt-3">
        <div class="font-semibold text-xl">Informações:</div>
        
          <div class="flex flex-wrap gap-6">
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-codigo">Código: <span class="text-red-500"><strong> *</strong></span></label>
              <input pInputText id="campo-codigo" type="text" placeholder="Digite o código de referência do imóvel." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-finalidade">Finalidade: <span class="text-red-500"><strong> *</strong></span></label>
             <p-select [options]="finalidades" [checkmark]="true" [showClear]="true" placeholder="Selecione a finalidade do imóvel."  />
           </div>

            <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-tipo-imovel">Tipo do Imóvel: <span class="text-red-500"><strong> *</strong></span></label>
             <p-select [options]="tipoImovel"  [checkmark]="true"  [showClear]="true" placeholder="Selecione o tipo do imóvel."  />
           </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div>
      <div class="card flex flex-col gap-4 mt-3">
        <div class="font-semibold text-xl">Localização:</div>

           <div class="flex flex-row flex-wrap gap-4">
            <div class="flex flex-col gap-2">
              <label for="campo-pergunta-condominio">Em Condomínio?</label>
              <p-select [options]="condominioValidar" 
              [(ngModel)]="respostaCondominio" 
              [checkmark]="true" 
              optionLabel="resposta" 
              optionValue="resposta" 
              [showClear]="true" 
              placeholder="Está em um condomínio?" />
            </div>

              @switch (respostaCondominio) {
                @case ('Sim') {
                  <div class="flex flex-col grow gap-2">
                    <label for="campo-nome-condominio">Nome Condomínio:</label>
                    <div class="flex flex-row">
                    <input 
                    pInputText 
                    id="campo-nome-condominio" 
                    type="text" 
                    placeholder="Digite o nome do condomínio."
                    class="w-full"
                    />
                    <p-button 
                    icon="pi pi-plus"
                    (click)="abrirModalCondominio()" 
                     />
                  </div>
                </div>
                }
              } 

            <div class="flex flex-col gap-2">
              <label for="campo-cep">CEP: <span class="text-red-500"><strong> *</strong></span></label>
               <div class="flex flex-row">
                 <p-inputmask mask="99999-999" 
                 [(ngModel)]="cep" 
                 placeholder="99999-999" />
                 <p-button
                 (click)="buscarCep(cep)"
                 icon="pi pi-search"/>
                </div>
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-logradouro">Logradouro: <span class="text-red-500"><strong> *</strong></span></label>
              <input
              [(ngModel)]="logradouro" 
              pInputText 
              id="campo-logradouro" 
              type="text" 
              placeholder="Digite o nome da rua." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-numero">Número: <span class="text-red-500"><strong> *</strong></span></label>
              <input 
              pInputText 
              id="campo-numero" 
              type="text" 
              placeholder="Número do imóvel."/>
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-estado">Estado: <span class="text-red-500"><strong> *</strong></span></label>
              <input
              [(ngModel)]="estado" 
              pInputText 
              id="campo-estado" 
              type="text" 
              placeholder="Digite o nome da estado." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-cidade">Cidade: <span class="text-red-500"><strong> *</strong></span></label>
              <input
              [(ngModel)]="cidade" 
              pInputText 
              id="campo-cidade" 
              type="text" 
              placeholder="Digite o nome da cidade." />
            </div>
            
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-bairro">Bairro: <span class="text-red-500"><strong> *</strong></span></label>
              <input
              [(ngModel)]="bairro" 
              pInputText 
              id="campo-bairro" 
              type="text" 
              placeholder="Digite o nome da bairro." />
            </div>
        
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-complemento">Complemento:</label>
              <input pInputText id="campo-complemento" type="text" placeholder="Ex.: Apartamento 101." />
            </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex pt-6 justify-end">
    <p-button label="Próximo" icon="pi pi-arrow-right" iconPos="right" (onClick)="activateCallback(2)" />
  </div>

  </ng-template>
    </p-step-panel>
      <p-step-panel [value]="2">
        <ng-template #content let-activateCallback="activateCallback">
          <div class="font-semibold text-xl mb-2">Valores:</div>
            <div class="flex flex-wrap gap-6 w-full">
              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-valor">Valor Solicitado: <span class="text-red-500"><strong> *</strong></span></label>
                <p-inputnumber [(ngModel)]="valorSolicitado"
                placeholder="Digite o valor solicitado no imóvel."
                mode="currency"
                currency="BRL"
                locale="pt-BR" />
              </div>

              @switch (respostaCondominio) {
                @case ('Sim') {
                  <div class="flex flex-col grow basis-0 gap-2">
                    <label for="campo-valor-condominio">Condomínio:</label>
                    <p-inputnumber [(ngModel)]="valorCondominio"
                    placeholder="Digite o valor do condomínio."
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR" />
                  </div>
                }
              }

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-valor-iptu">IPTU:</label>
                <p-inputnumber [(ngModel)]="valorIptu"
                placeholder="Digite o valor do IPTU."
                mode="currency"
                currency="BRL"
                locale="pt-BR" />
              </div>
            </div>

            <div class="font-semibold text-xl mt-5 mb-2">Características:</div>
            <div class="flex flex-wrap gap-6">
              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-quartos">Quantidade de Quartos:</label>
                <p-inputnumber [(ngModel)]="quantidadeQuartos"
                placeholder="Digite a quantidade de quartos." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-suites">Sendo Suítes:</label>
                <p-inputnumber [(ngModel)]="quantidadeSuites"
                placeholder="Digite a quantidade de suítes." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-banheiros">Quantidade de Banheiros:</label>
                <p-inputnumber [(ngModel)]="quantidadeBanheiros"
                placeholder="Digite a quantidade de banheiros." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-vagas">Vagas de Garagem:</label>
                <p-inputnumber [(ngModel)]="quantidadeVagas"
                placeholder="Digite a quantidade de vagas de garagem." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-andares">Andares:</label>
                <p-inputnumber [(ngModel)]="quantidadeAndares"
                placeholder="Digite a quantidade de andares." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-salas">Quantidade de Salas:</label>
                <p-inputnumber [(ngModel)]="quantidadeSalas"
                placeholder="Digite a quantidade de salas." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-finalidade">Está Mobiliado?</label>
             <p-select 
             [options]="mobiliaValidar" 
             [checkmark]="true" 
             optionLabel="resposta" 
             optionValue="resposta" 
             [showClear]="true" 
             placeholder="Selecione uma opção."
             appendTo="body"  />
              </div>
            </div>

              <div class="flex pt-6 justify-between">
                <p-button label="Voltar" severity="secondary" icon="pi pi-arrow-left" (onClick)="activateCallback(1)" />
                <p-button label="Próximo" icon="pi pi-arrow-right" iconPos="right" (onClick)="activateCallback(3)" />
               </div>
            </ng-template>
          </p-step-panel>

      <p-step-panel [value]="3">
        <ng-template #content let-activateCallback="activateCallback">
          <div class="flex flex-col">
          <div class="font-semibold text-xl mb-4">Fotos do Imóvel: <span class="text-red-500"><strong> *</strong></span></div>
                    <p-fileupload
                    chooseLabel="Procurar"
                    uploadLabel="Enviar"
                    cancelLabel="Cancelar"
                     name="demo[]" 
                     (onUpload)="onUpload($event)" 
                     [multiple]="true" 
                     accept="image/*" 
                     maxFileSize="1000000" 
                     mode="advanced" 
                     url="https://www.primefaces.org/cdn/api/upload.php">
                        <ng-template #empty>
                            <div>Arraste e jogue suas fotos do imóvel aqui.</div>
                        </ng-template>
                    </p-fileupload>
                </div>

            <div class="flex pt-6 justify-between">
              <p-button label="Voltar" severity="secondary" icon="pi pi-arrow-left" (onClick)="activateCallback(2)" />
              <p-button label="Salvar" icon="pi pi-file" iconPos="right" (onClick)="cadastrarImovel()" />
            </div>
          </ng-template>
        </p-step-panel>
      </p-step-panels>
    </p-stepper>
  </div>

<form [formGroup]="corretorForm">
<p-dialog 
  header="Cadastrar Corretor" 
  [(visible)]="mostrarModalCorretor" 
  [modal]="true" 
  [closable]="true" 
  [style]="{width: '50rem'}">

  <div class="flex flex-row gap-4">
      <div class="flex flex-col w-full grow gap-2">
        <label>
          Nome Completo:
          <span class="text-red-500">*</span>
        </label>
        <input
          formControlName='nome'
          type="text"
          pInputText
          placeholder="Digite o nome completo do corretor."
          class="w-full" />
      </div>

        <div class="flex flex-col w-full grow gap-2">
          <label>
            Código:
            <span class="text-red-500">*</span>
          </label>
          <p-inputnumber
            formControlName='codigo'
            class="w-full"
            [minlength]="5"
            [maxlength]="10"
            [showClear]="true"
            [useGrouping]="false"
            placeholder="Digite o código de referência do corretor.">
          </p-inputnumber>
        </div>
        
        <div class="flex flex-col basis-0 gap-2">
          <label for="">CRECI: <span class="text-red-500">*</span></label>
          <p-inputmask
            formControlName='creci' 
            mask="99.999F" 
            placeholder="00.000F" 
            formControlName='creci'/>
        </div>
</div>

    <div class="flex flex-row gap-4 mt-4">
      <div class="flex flex-col w-full grow gap-2">
        <label>
          Celular:
          <span class="text-red-500">*</span>
        </label>
        <p-inputmask
          formControlName='celular'
          styleClass="w-full"
          mask="(99) 99999-9999"
          placeholder="(00) 00000-0000">
        </p-inputmask>
      </div>

      <div class="flex flex-col w-full grow gap-2">
        <label>
          E-mail:
          <span class="text-red-500">*</span>
        </label>
        <input
          formControlName='email'
          type="email"
          pInputText
          placeholder="Digite o e-mail do corretor."
          class="w-full" />
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <p-button
        label="Salvar"
        icon="pi pi-check"
        (click)="salvarCorretor()">
      </p-button>
    </div>
</p-dialog>
</form>

  <form [formGroup]="clienteForm">
  <p-dialog 
  header="Cadastrar Proprietário" 
  [(visible)]="mostrarModalProprietario" 
  [modal]="true" 
  [closable]="true" 
  [style]="{width: '50rem'}">
    <div class="flex flex-wrap basis-0 gap-3">
        <div class="flex flex-col grow gap-2">
          <label for="">Nome Completo: <span class="text-red-500"><strong> *</strong></span></label>
          <input type="text" pInputText placeholder="Digite o nome do cliente." formControlName="nome" />
        </div>
        
        <div class="flex flex-col gap-2">
          <label for="campo-codigo">Código: <span class="text-red-500"><strong> *</strong></span></label>
          <input pInputText id="campo-codigo" type="text" placeholder="Digite o código de referência do cliente." formControlName="codigo" />
        </div>
        
        <div class="flex flex-col gap-2">
          <label for="">Celular: <span class="text-red-500"><strong> *</strong></span></label>
          <p-inputmask mask="(99) 99999-9999" placeholder="(00) 00000-0000" formControlName="celular" />
        </div>
        
        <div class="flex flex-col grow basis-0 gap-2">
          <label for="">E-mail: <span class="text-red-500"><strong> *</strong></span></label>
          <input type="email" pInputText placeholder="Digite o e-mail do cliente." formControlName="email" />
        </div>
        
        <div class="flex flex-col gap-2">
          <label for="">Como nos encontrou:</label>
          <p-select
          formControlName="como_encontrou"
          appendTo="body" 
          [options]="tiposContato" 
          placeholder="Selecione por onde o cliente veio." 
          fluid/>
        </div>

      <div class="flex flex-col grow basis-0 gap-2">
        <label for="">Tipo do Cliente: <span class="text-red-500"><strong> *</strong></span></label>
        <p-select
        formControlName="tipo"
        appendTo="body" 
        [options]="tipoCliente" 
        id="tipo-cliente" 
        placeholder="Selecione o tipo do cliente."/>
      </div>
    </div>


       <div class="flex justify-end mt-4">
      <p-button
        label="Salvar"
        icon="pi pi-check"
        (click)="salvarProprietario()">
      </p-button>
    </div>
  </p-dialog>
</form>

<form [formGroup]="condominioForm">
  <p-dialog
  header="Cadastrar Condomínio"
  [(visible)]="mostrarModalCondominio"
  [modal]="true"
  [closable]="true"
  [style]="{ width: '50rem' }">

  <div class="flex flex-wrap basis-0 gap-3">
    <div class="flex flex-col w-full gap-2">
      <label for="campo-nome-condominio">
        Nome do Condomínio:
        <span class="text-red-500"><strong> *</strong></span>
      </label>
      <input
        formControlName="nome"
        id="campo-nome-condominio"
        type="text"
        pInputText
        placeholder="Digite o nome do condomínio." />
    </div>

    <div class="flex flex-col gap-2">
      <label for="campo-cep">
        CEP:
        <span class="text-red-500"><strong> *</strong></span>
      </label>
      <div class="flex flex-row">
        <p-inputmask
        formControlName="cep"
        id="campo-cep"
        mask="99999-999"
        placeholder="00000-000">
      </p-inputmask>
      <p-button
      (click)="buscarCep(cep)"
      icon="pi pi-search"/>
    </div>
    </div>

    <div class="flex flex-col grow gap-2">
      <label for="campo-logradouro">
        Logradouro:
        <span class="text-red-500"><strong> *</strong></span>
      </label>
      <input
        formControlName="logradouro"
        id="campo-logradouro"
        type="text"
        pInputText
        placeholder="Digite o logradouro." />
    </div>

    <div class="flex flex-col gap-2">
      <label for="campo-numero">
        Número:
        <span class="text-red-500"><strong> *</strong></span>
      </label>
      <p-inputnumber
        id="campo-numero"
        [useGrouping]="false"
        formControlName="numero"
        placeholder="Número">
      </p-inputnumber>
    </div>

    <div class="flex flex-col grow basis-0 gap-2">
      <label for="campo-bairro">
        Bairro:
        <span class="text-red-500"><strong> *</strong></span>
      </label>
      <input
        formControlName="bairro"
        id="campo-bairro"
        type="text"
        pInputText
        placeholder="Digite o bairro." />
    </div>

    <div class="flex flex-col grow basis-0 gap-2">
      <label for="campo-estado">
        Estado:
        <span class="text-red-500"><strong> *</strong></span>
      </label>
      <input
        formControlName="estado"
        id="campo-estado"
        type="text"
        pInputText
        placeholder="Digite o estado." />
    </div>

    <div class="flex flex-col grow basis-0 gap-2">
      <label for="campo-cidade">
        Cidade:
        <span class="text-red-500"><strong> *</strong></span>
      </label>
      <input
        formControlName="cidade"
        id="campo-cidade"
        type="text"
        pInputText
        placeholder="Digite a cidade." />
    </div>

  </div>

  <ng-template pTemplate="footer">
    <div class="flex justify-end">
      <p-button
        label="Salvar"
        icon="pi pi-save"
        severity="success"
        (click)="cadastrarCondominio()">
      </p-button>
    </div>
  </ng-template>
</p-dialog>
</form>
`,
  providers: [MessageService],
  styles: ``
})
export class ImovelCreate {
  private readonly messageService = inject(MessageService);

  private readonly corretorService = inject(CorretorService);

  private readonly clienteService = inject(ClienteService);

  private readonly cepService = inject(CepService);

  private readonly formBuilder = inject(FormBuilder);

  proprietarios: ClienteResponse[] | undefined;

  corretores: CorretorResponse[] | undefined;

  finalidades = [...FINALIDADES];

  tipoImovel = [...TIPOS_IMOVEL];

  tiposContato = [...TIPOS_CONTATO];

  tipoCliente = [...TIPO_CLIENTE_MODAL];

  cep: string = '';

  bairro: string = '';

  cidade: string = '';

  estado: string = '';

  logradouro: string = '';

  mostrarModalCorretor: boolean = false;

  mostrarModalProprietario: boolean = false;

  mostrarModalCondominio: boolean = false;

  clienteForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    como_encontrou: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  corretorForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    creci: ['', [Validators.required]],
    dataNascimento: [null],
    rg: [null],
    cpf: [null],
  });

  condominioForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    cep: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    numero: [null, [Validators.required]],
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });

  dadosAdicionaisForm = this.formBuilder.group({});

  condominioValidar: ValidarCondominio[] | undefined;

  respostaCondominio: ValidarCondominio | string | undefined;

  mobiliaValidar: ValidarMobilia[] | undefined;

  valorSolicitado?: number;

  valorCondominio?: number;

  valorIptu?: number;

  quantidadeQuartos?: number;

  quantidadeBanheiros?: number;

  quantidadeSuites?: number;

  quantidadeSalas?: number;

  quantidadeAndares?: number;

  quantidadeVagas?: number;

  uploadedFiles: any[] = [];

  constructor(
    private router: Router
  ) {

  }

  ngOnInit() {
    this.condominioValidar = [
      { resposta: 'Sim' },
      { resposta: 'Não' },
    ];

    this.mobiliaValidar = [
      { resposta: 'Sim' },
      { resposta: 'Não' },
    ]

    this.buscarCorretores();

    this.buscarProprietarios();


    this.clienteForm
      .get("tipo")
      ?.valueChanges
      .subscribe(tipo => {
        this.alterarFormularioDadosAdicionais(tipo);
      });
  }


  alterarFormularioDadosAdicionais(tipo: string | null): void {
    if (tipo === "Proprietário") {
      this.dadosAdicionaisForm = this.criarFormProprietario();
    }
    else if (tipo === "Locatário") {
      this.dadosAdicionaisForm = this.criarFormLocatario();
    }
  }

  buscarCorretores() {
    this.corretorService.getAll().subscribe({
      next: (corretores: CorretorResponse[]) => {
        this.corretores = corretores;
      },
      error: (erro: Error) => {
        console.error('Erro ao buscar corretores:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar a lista de corretores.'
        });
      }
    });
  }

  buscarProprietarios() {
    this.clienteService.getAll().subscribe({
      next: (clientes: ClienteResponse[]) => {
        this.proprietarios = clientes.filter(cliente => cliente.tipo != 'Interessado');
      },
      error: (erro: Error) => {
        console.error('Erro ao buscar clientes:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar a lista de clientes do tipo "Proprietário" e "Locatário".'
        });
      }
    });
  }

  buscarProprietarioPorId(id: string) {
    this.clienteService.getById(id).subscribe({
      next: (cliente: ClienteResponse) => {
        console.log('Cliente cadastrado:', cliente);
      }
    });
  }

  buscarCorretorPorId(id: string) {
    this.corretorService.getById(id).subscribe({
      next: (corretor: CorretorResponse) => {
        console.log('Corretor cadastrado:', corretor);
      }
    });
  }

  buscarCep(cep: string) {
    var cepLimpo = cep.replace('-', '').trim();

    if (cepLimpo.length === 8) {
      this.cepService.get(cepLimpo).subscribe({
        next: (dados) => {
          this.preencherDadosEndereco(dados);
        },
        error: (erro: Error) => {
          console.error('Erro ao buscar CEP:', erro);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Não foi possível buscar o CEP. Por favor, tente novamente mais tarde.'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'CEP inválido. Por favor, insira um CEP no formato 99999-999.'
      });
    }
  }

  preencherDadosEndereco(dados: ConsultaCepResponse) {
    this.logradouro = dados.logradouro;

    this.estado = dados.estado;

    this.cidade = dados.localidade;

    this.bairro = dados.bairro;
  }

  abrirModalCorretor() {
    this.mostrarModalCorretor = true;
  }

  abrirModalProprietario() {
    this.mostrarModalProprietario = true;
  }

  abrirModalCondominio() {
    this.mostrarModalCondominio = true;
  }

  criarFormProprietario(): FormGroup {
    return this.formBuilder.group({
      imovel_associado: ['', [Validators.required]]
    })
  }

  criarFormLocatario(): FormGroup {
    return this.formBuilder.group({
      imovel_associado: ['', [Validators.required]]
    })
  }

  cadastrarCondominio() {
    this.mostrarModalCondominio = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Condomínio cadastrado com sucesso!'
    });
  }

  salvarCorretor() {
    const formCorretor: CorretorCriarRequest = {
      nome_completo: this.corretorForm.getRawValue().nome!,
      codigo: this.corretorForm.getRawValue().codigo!,
      creci: this.corretorForm.getRawValue().creci!,
      celular: this.corretorForm.getRawValue().celular!,
      email: this.corretorForm.getRawValue().email!,
      data_nascimento: this.corretorForm.getRawValue().dataNascimento!,
      rg: this.corretorForm.getRawValue().rg!,
      cpf: this.corretorForm.getRawValue().cpf!,
    };

    this.cadastrarCorretor(formCorretor);
  }

  cadastrarCorretor(formCorretor: CorretorCriarRequest) {
    this.corretorService.create(formCorretor).subscribe({
      next: (corretor: CorretorResponse) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Corretor cadastrado com sucesso!'
        });

        this.buscarCorretores();

        this.buscarCorretorPorId(corretor.id);

        this.mostrarModalCorretor = false;
      },
      error: (erro: Error) => {
        console.error('Erro ao cadastrar corretor:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível cadastrar o corretor.'
        });
      }
    });
  }

  salvarProprietario() {
    const formCliente: CriarClienteRequest = {
      nome: this.clienteForm.getRawValue().nome!,
      codigo: this.clienteForm.getRawValue().codigo!,
      celular: this.clienteForm.getRawValue().celular!,
      email: this.clienteForm.getRawValue().email!,
      tipo: this.clienteForm.getRawValue().tipo!,
      como_encontrou: this.clienteForm.getRawValue().como_encontrou!
    };

    const formDadosAdicionais = this.dadosAdicionaisForm.getRawValue() as CriarDadosAdicionais;

    this.cadastrarProprietario(formCliente, formDadosAdicionais);
  }

  cadastrarProprietario(
    form: CriarClienteRequest,
    dadosAdicionais: CriarDadosAdicionais) {
    this.clienteService.create(form, dadosAdicionais).subscribe({
      next: (cliente: ClienteResponse) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso!',
          detail: 'Proprietário cadastrado com sucesso!'
        });

        this.buscarProprietarios();

        this.buscarProprietarioPorId(cliente.id);

        this.mostrarModalProprietario = false;
      },
      error: (erro: Error) => {
        console.error('Erro ao cadastrar proprietário:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: 'Não foi possível cadastrar o proprietário.'
        });
      }
    });
  }

  cadastrarImovel() {
    this.router.navigate(['/pages/imoveis'])
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'Successo!',
      detail: 'Foto carregada!'
    });
  }

  onBasicUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'Successo!',
      detail: 'Foto carregada com o modo basico.'
    });
  }
}
