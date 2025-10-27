import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { StepperModule } from 'primeng/stepper';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

// Trocar no futuro

interface Finalidades {
  nome: string
}

interface TiposImoveis {
  nome: string
}

interface ValidarCondominio {
  resposta: string
}

interface ValidarMobilia {
  resposta: string
}

@Component({
  selector: 'app-create',
  imports: [
    InputTextModule,
    FormsModule,
    SelectModule,
    InputMaskModule,
    ButtonModule,
    StepperModule,
    InputNumberModule,
    ToastModule,
    FileUploadModule,
  ],
  template: `
  <p-toast/>
  <!-- Trocar para AutoCompleteModule depois de criar os serviços :D -->
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
              <label for="campo-proprietario">Proprietário:</label>
              <input pInputText id="campo-propiretario" type="text" placeholder="Digite ou selecione o nome do proprietário." />
            </div>

          <div class="flex flex-col grow basis-0 gap-2">
            <label for="campo-corretor">Corretor:</label>
            <input pInputText id="campo-corretor" type="text" placeholder="Digite ou selecione o nome do corretor." />
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
              <label for="campo-codigo">Código:</label>
              <input pInputText id="campo-codigo" type="text" placeholder="Digite o código de referência do imóvel." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-finalidade">Finalidade:</label>
             <p-select [options]="finalidades" [(ngModel)]="finalidadeSelecionada" [checkmark]="true" optionLabel="nome" optionValue="nome" [showClear]="true" placeholder="Selecione a finalidade do imóvel."  />
           </div>

            <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-tipo-imovel">Tipo do Imóvel:</label>
             <p-select [options]="tipo" [(ngModel)]="tipoSelecionado" [checkmark]="true" optionLabel="nome" optionValue="nome" [showClear]="true" placeholder="Selecione o tipo do imóvel."  />
           </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div>
      <div class="card flex flex-col gap-4 mt-3">
        <div class="font-semibold text-xl">Localização:</div>

           <div class="flex flex-wrap gap-6">
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-cep">CEP:</label>
              <!-- Melhorar posição do botão -->
               <div class="flex flex-row">
                 <p-inputmask mask="99999-999" [(ngModel)]="cep" placeholder="99999-999" />
                 <p-button
                 icon="pi pi-search"/>
                </div>
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-logradouro">Logradouro:</label>
              <input pInputText id="campo-logradouro" type="text" placeholder="Digite o nome da rua." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-numero">Número:</label>
              <input pInputText id="campo-numero" type="text" placeholder="Digite o número do imóvel."/>
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-estado">Estado:</label>
              <input pInputText id="campo-estado" type="text" placeholder="Digite o nome da estado." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-cidade">Cidade:</label>
              <input pInputText id="campo-cidade" type="text" placeholder="Digite o nome da cidade." />
            </div>
            
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-bairro">Bairro:</label>
              <input pInputText id="campo-bairro" type="text" placeholder="Digite o nome da bairro." />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-pergunta-condominio">Em Condomínio?</label>
              <p-select [options]="condominioValidar" 
              [(ngModel)]="respostaCondominio" 
              [checkmark]="true" 
              optionLabel="resposta" 
              optionValue="resposta" 
              [showClear]="true" 
              placeholder="Diga se o imóvel está em um condomínio" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-nome-condominio">Nome Condomínio:</label>
              <input pInputText id="campo-nome-condominio" type="text" placeholder="Digite o nome do condomínio." />
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
                <label for="campo-valor">Valor Solicitado:</label>
                <p-inputnumber [(ngModel)]="valorSolicitado"
                placeholder="Digite o valor solicitado no imóvel."
                mode="currency"
                currency="BRL"
                locale="pt-BR" />
              </div>

              <div class="flex flex-col grow basis-0 gap-2">
                <label for="campo-valor-condominio">Condomínio:</label>
                <p-inputnumber [(ngModel)]="valorCondominio"
                placeholder="Digite o valor do condomínio."
                mode="currency"
                currency="BRL"
                locale="pt-BR" />
              </div>

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
             [(ngModel)]="respostaMobilia" 
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
          <div class="font-semibold text-xl mb-4">Fotos do Imóvel:</div>
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
`,
  providers: [MessageService],
  styles: ``
})
export class ImovelCreate {
  // Trocar no futuro com as informações corretas
  finalidades: Finalidades[] | undefined;

  finalidadeSelecionada: Finalidades | undefined;

  tipo: TiposImoveis[] | undefined;

  tipoSelecionado: TiposImoveis | undefined;

  condominioValidar: ValidarCondominio[] | undefined;

  respostaCondominio: ValidarCondominio | undefined;

  mobiliaValidar: ValidarMobilia[] | undefined;

  respostaMobilia: ValidarMobilia | undefined;

  cep: string = '';

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
    private messageService: MessageService,
    private router: Router
  ) {
    
   }

  ngOnInit() {
    this.finalidades = [
      { nome: 'Venda' },
      { nome: 'Locação' },
    ];

    this.tipo = [
      { nome: 'Casa' },
      { nome: 'Apartamento' },
      { nome: 'Terreno' },
    ];

    this.condominioValidar = [
      { resposta: 'Sim' },
      { resposta: 'Não' },
    ];

    this.mobiliaValidar = [
      { resposta: 'Sim' },
      { resposta: 'Não' },
    ]
  }

  cadastrarImovel() {
    this.router.navigate(['/pages/imoveis'])
  }

  onUpload(event: any) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Foto carregada!' });
  }

  onBasicUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Foto carregada com o modo basico.' });
  }
}
