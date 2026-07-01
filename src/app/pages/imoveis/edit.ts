import { ClienteResponse } from '@/models/cliente.model';
import { CondominioResponse } from '@/models/condominio.model';
import { ConsultaCepResponse } from '@/models/consulta.cep.model';
import { CorretorResponse } from '@/models/corretor.model';
import { ImovelResponse } from '@/models/imovel.model';
import { CepService } from '@/services/cep.service';
import { ClienteService } from '@/services/cliente.service';
import { CondominioService } from '@/services/condominio.service';
import { CorretorService } from '@/services/corretor.service';
import { ImovelService } from '@/services/imovel.service';
import { TIPO_CLIENTE_MODAL } from '@/types/cliente.types';
import { ESTA_EM_CONDOMINIO } from '@/types/condominio.types';
import { TIPOS_CONTATO } from '@/types/contato.types';
import { FINALIDADES } from '@/types/finalidade.types';
import { TIPOS_IMOVEL } from '@/types/imovel.types';
import { ESTA_MOBILIADO } from '@/types/mobiliado.types';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit',
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
  <form [formGroup]="imovelParaEditarForm">
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
              optionLabel="nome"
              optionValue="id" 
              [checkmark]="true" 
              [showClear]="true" 
              placeholder="Selecione o proprietário."
              formControlName="proprietario"
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
            optionLabel="nome_completo"
            optionValue="id"
            [showClear]="true" 
            placeholder="Selecione o corretor."
            formControlName="corretor"
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
              <input pInputText 
              id="campo-codigo" 
              type="text" 
              placeholder="Digite o código de referência do imóvel."
              formControlName="codigo"
               />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-finalidade">Finalidade: <span class="text-red-500"><strong> *</strong></span></label>
             <p-select 
             [options]="finalidades" 
             [checkmark]="true" 
             [showClear]="true" 
             formControlName="finalidade"
             placeholder="Selecione a finalidade do imóvel."  />
           </div>

            <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-tipo-imovel">Tipo do Imóvel: <span class="text-red-500"><strong> *</strong></span></label>
             <p-select 
             [options]="tipoImovel"  
             [checkmark]="true"  
             formControlName="tipo"
             [showClear]="true" 
             placeholder="Selecione o tipo do imóvel."  />
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
              <p-select 
              [options]="condominioValidar"
              formControlName="em_condominio" 
              [checkmark]="true" 
              [showClear]="true" 
              placeholder="Está em um condomínio?" />
            </div>

              @switch (imovelParaEditarForm.get('em_condominio')?.getRawValue()) {
                @case ('Sim') {
                  <div class="flex flex-col grow gap-2">
                    <label for="campo-nome-condominio">Nome Condomínio:</label>
                    <div class="flex flex-row">
                      @switch (condominioSelecionado) {
                        @case (condominioSelecionado) {
                          @if (condominioSelecionado != '') {
                              <p-button
                              icon="pi pi-pencil"
                              severity="warn"
                              />
                              /* (click)="buscarCondominioPorId(
                                condominioSelecionado)" */
                              <p-select
                              class="w-full"
                              [options]="condominios"
                              formControlName="condominio"
                              optionLabel="nome"
                              optionValue="id"
                              [showClear]="true"
                              [checkmark]="true"
                              placeholder="Selecione o condomínio."
                              />
                              <p-button 
                              icon="pi pi-plus"
                              (click)="abrirModalCondominio()" 
                              />
                              <p-button
                              icon="pi pi-trash"
                              severity="danger"
                              />
                              /* (click)="confirmarApagarCondominio(
                                condominioSelecionado)" */
                          } @else {
                              <p-select
                              class="w-full"
                              [options]="condominios"
                              optionLabel="nome"
                              formControlName="condominio"
                              optionValue="id"
                              [checkmark]="true"
                              placeholder="Selecione o condomínio."
                              />
                              <p-button 
                              icon="pi pi-plus"
                              (click)="abrirModalCondominio()" 
                              />     
                              }
                            }
                          }
                    </div>
                  </div>
                }
              }
  
            <div class="flex flex-col gap-2">
              <label for="campo-cep">CEP: <span class="text-red-500"><strong> *</strong></span></label>
               <div class="flex flex-row">
                 <p-inputmask
                 formControlName="cep"
                 mask="99999-999" 
                 placeholder="99999-999" />
                 <p-button
                 icon="pi pi-search"/>
                </div>
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-logradouro">Logradouro: <span class="text-red-500"><strong> *</strong></span></label>
              <input
              pInputText 
              formControlName="logradouro"
              id="campo-logradouro" 
              type="text" 
              placeholder="Digite o nome da rua." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-numero">Número: <span class="text-red-500"><strong> *</strong></span></label>
              <p-input-number 
              formControlName="numero"
              id="campo-numero"
              [useGrouping]="false"  
              placeholder="Número do imóvel."/>
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-estado">Estado: <span class="text-red-500"><strong> *</strong></span></label>
              <input
              pInputText
              formControlName="estado" 
              id="campo-estado" 
              type="text" 
              placeholder="Digite o nome da estado." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-cidade">Cidade: <span class="text-red-500"><strong> *</strong></span></label>
              <input
              pInputText
              formControlName="cidade" 
              id="campo-cidade" 
              type="text" 
              placeholder="Digite o nome da cidade." />
            </div>
            
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-bairro">Bairro: <span class="text-red-500"><strong> *</strong></span></label>
              <input
              pInputText
              formControlName="bairro" 
              id="campo-bairro" 
              type="text" 
              placeholder="Digite o nome da bairro." />
            </div>
        
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-complemento">Complemento:</label>
              <input
              formControlName="complemento" 
              pInputText 
              id="campo-complemento" 
              type="text" 
              placeholder="Ex.: Apartamento 101." />
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
                <p-inputnumber
                formControlName="valor"
                placeholder="Digite o valor solicitado no imóvel."
                mode="currency"
                currency="BRL"
                locale="pt-BR" />
              </div>

              @switch (imovelParaEditarForm.get('em_condominio')?.getRawValue()) {
                @case ('Sim') {
                  <div class="flex flex-col grow basis-0 gap-2">
                    <label for="campo-valor-condominio">Valor do Condomínio:</label>
                    <p-inputnumber
                    formControlName="valor_condominio"
                    placeholder="Digite o valor do condomínio."
                    mode="currency"
                    currency="BRL"
                    locale="pt-BR" />
                  </div>
                }
              }

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-valor-iptu">IPTU:</label>
                <p-inputnumber
                formControlName="iptu"
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
                <p-inputnumber
                formControlName="quantidade_quartos"
                placeholder="Digite a quantidade de quartos." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-suites">Sendo Suítes:</label>
                <p-inputnumber
                formControlName="quantidade_suites"
                placeholder="Digite a quantidade de suítes." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-banheiros">Quantidade de Banheiros:</label>
                <p-inputnumber
                formControlName="quantidade_banheiros"
                placeholder="Digite a quantidade de banheiros." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-vagas">Vagas de Garagem:</label>
                <p-inputnumber
                formControlName="quantidade_vagas"
                placeholder="Digite a quantidade de vagas de garagem." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-andares">Andares:</label>
                <p-inputnumber
                formControlName="quantidade_andares"
                placeholder="Digite a quantidade de andares." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-salas">Quantidade de Salas:</label>
                <p-inputnumber
                formControlName="quantidade_salas"
                placeholder="Digite a quantidade de salas." />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-finalidade">Está Mobiliado?</label>
             <p-select 
             [options]="mobiliaValidar" 
             [checkmark]="true" 
             [showClear]="true"
             formControlName="esta_mobiliado" 
             placeholder="Está mobiliado?"
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
              <!-- <p-button label="Salvar" icon="pi pi-file" iconPos="right" (onClick)="salvarImovel()" /> -->
            </div>
          </ng-template>
        </p-step-panel>
      </p-step-panels>
    </p-stepper>
  </div>
</form>
  `,
  styles: ``
})
export class ImovelEdit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);
  private readonly corretorService = inject(CorretorService);
  private readonly clienteService = inject(ClienteService);
  private readonly condominioService = inject(CondominioService);
  private readonly cepService = inject(CepService);
  private readonly imovelService = inject(ImovelService);
  private readonly confirmationService = inject(ConfirmationService);

  private readonly formBuilder = inject(FormBuilder);

  proprietarios: ClienteResponse[] | undefined;

  corretores: CorretorResponse[] | undefined;

  condominios: CondominioResponse[] | undefined;

  finalidades = [...FINALIDADES];

  tipoImovel = [...TIPOS_IMOVEL];

  tiposContato = [...TIPOS_CONTATO];

  tipoCliente = [...TIPO_CLIENTE_MODAL];

  condominioValidar = [...ESTA_EM_CONDOMINIO];

  mobiliaValidar = [...ESTA_MOBILIADO];

  mostrarModalCorretor: boolean = false;

  mostrarModalProprietario: boolean = false;

  mostrarModalCondominio: boolean = false;

  mostrarModalCondominioParaEditar: boolean = false;

  condominioSelecionado: string = '';

  corretorSelecionado: string = '';

  proprietarioSelecionado: string = '';

  imovelParaEditarForm = this.formBuilder.group({
    proprietario: ['', [Validators.required]],
    corretor: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
    finalidade: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    em_condominio: ['', [Validators.required]],
    condominio: [''],
    cep: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    numero: this.formBuilder.control<number | null>(null),
    estado: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    complemento: ['', [Validators.required]],
    valor: this.formBuilder.control<number | null>(null),
    valor_condominio: this.formBuilder.control<number | null>(null),
    iptu: this.formBuilder.control<number | null>(null),
    quantidade_quartos: this.formBuilder.control<number | null>(null),
    quantidade_suites: this.formBuilder.control<number | null>(null),
    quantidade_banheiros: this.formBuilder.control<number | null>(null),
    quantidade_vagas: this.formBuilder.control<number | null>(null),
    quantidade_andares: this.formBuilder.control<number | null>(null),
    quantidade_salas: this.formBuilder.control<number | null>(null),
    esta_mobiliado: ['', [Validators.required]]
  });

  clienteForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    como_encontrou: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  dadosAdicionaisForm = this.formBuilder.group({});

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
    numero: this.formBuilder.control<number | null>(null),
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });

  condominioParaEditarForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    cep: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    numero: this.formBuilder.control<number | null>(null),
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });

  idParaEditar: string = '';

  uploadedFiles: any = [];

  constructor(
    private router: Router,
  ) {
    this.idParaEditar = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.buscarImovelParaEditar(this.idParaEditar);
  }

  ngOnInit() {
    this.buscarCorretores();

    this.buscarProprietarios();

    this.buscarCondominios();

    this.clienteForm
      .get("tipo")
      ?.valueChanges
      .subscribe(tipo => {
        this.alterarFormularioDadosAdicionais(tipo);
      });

    this.imovelParaEditarForm.get('condominio')?.valueChanges.subscribe(
      condominio => {
        if (condominio) {
          this.condominioSelecionado = condominio;
        }
      }
    );

    this.imovelParaEditarForm.get('corretor')?.valueChanges.subscribe(
      corretor => {
        if (corretor) {
          this.corretorSelecionado = corretor;
        }
      }
    );

    this.imovelParaEditarForm.get('proprietario')?.valueChanges.subscribe(
      proprietario => {
        if (proprietario) {
          this.proprietarioSelecionado = proprietario;
        }
      }
    );
  }

  buscarImovelParaEditar(id: string) {
    this.imovelService.getById(id).subscribe({
      next: (imovel: ImovelResponse) => {
        this.imovelParaEditarForm.patchValue({
          proprietario: this.proprietarioSelecionado,
          corretor: imovel.corretor,
          condominio: imovel.condominio,
          codigo: imovel.codigo,
          finalidade: imovel.finalidade,
          tipo: imovel.tipo,
          em_condominio: this.transformarBoolEmString(imovel.em_condominio),
          cep: imovel.cep,
          logradouro: imovel.logradouro,
          numero: imovel.numero,
          estado: imovel.estado,
          cidade: imovel.cidade,
          bairro: imovel.bairro,
          complemento: imovel.complemento,
          valor: imovel.valor,
          valor_condominio: imovel.valor_condominio,
          iptu: imovel.iptu,
          quantidade_quartos: imovel.quantidade_quartos,
          quantidade_suites: imovel.quantidade_suites,
          quantidade_banheiros: imovel.quantidade_banheiros,
          quantidade_vagas: imovel.quantidade_vagas,
          quantidade_andares: imovel.quantidade_andares,
          quantidade_salas: imovel.quantidade_salas,
          esta_mobiliado: this.transformarBoolEmString(imovel.eh_mobiliado)
        });

        console.log(imovel);
        
      },
      error: (erro: Error) => {
        console.error('Erro ao buscar imóvel para editar:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar os dados do imóvel para edição.'
        });
      }
    });
  }

  transformarStringEmBool(resposta: string): boolean {
    var escolhaTransformada: boolean = false;

    if (resposta == 'Sim') {
      escolhaTransformada = true
    } else if (resposta == 'Não') {
      escolhaTransformada = false
    }

    return escolhaTransformada;
  }

  transformarBoolEmString(resposta: boolean): string {
    var escolhaTransformada: string = '';

    if (resposta === true) {
      escolhaTransformada = 'Sim';
    } else if (resposta === false) {
      escolhaTransformada = 'Não';
    }

    return escolhaTransformada;
  }

  buscarCorretores() {
    this.corretorService.getAll().subscribe({
      next: (corretores: CorretorResponse[]) => {
        this.corretores = corretores;
        console.log(corretores);

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

  buscarCondominios() {
    this.condominioService.getAll().subscribe({
      next: (condominios: CondominioResponse[]) => {
        this.condominios = condominios
      },
      error: (erro: Error) => {
        console.error('Erro ao buscar condomínios:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar a lista de condomínios.'
        })
      }
    })
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
    return this.condominioForm.patchValue({
      cep: dados.cep,
      logradouro: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.estado,
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

  abrirModalCorretor() {
    this.mostrarModalCorretor = true;
  }

  abrirModalProprietario() {
    this.mostrarModalProprietario = true;
  }

  abrirModalCondominio() {
    this.mostrarModalCondominio = true;
  }

  abrirModalCondominioParaEditar() {
    this.mostrarModalCondominioParaEditar = true;
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
