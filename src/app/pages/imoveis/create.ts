import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';

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

@Component({
  selector: 'app-create',
  imports: [
    InputTextModule,
    FormsModule,
    SelectModule,
    InputMaskModule,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
  ],
  template: `
  <!-- Trocar para AutoCompleteModule depois de criar os serviços :D -->
  <div>
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
              <p-inputmask mask="99999-999" [(ngModel)]="cep" placeholder="99999-999" />
              <p-button
                icon="pi pi-search"/>
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
  `,
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

  cep: string = ''

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
      { resposta: 'sim' },
      { resposta: 'não' },
    ]
  }
}
