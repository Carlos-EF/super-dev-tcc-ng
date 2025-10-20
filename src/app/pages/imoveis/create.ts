import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

// Trocar no futuro(tirar no caso :D)

interface Finalidades {
  nome: string
}

interface TiposImoveis {
  nome: string
}

@Component({
  selector: 'app-create',
  imports: [
    InputTextModule,
    FormsModule,
    SelectModule,
    
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
              <input pInputText id="campo-propiretario" type="text" />
            </div>

          <div class="flex flex-col grow basis-0 gap-2">
            <label for="campo-corretor">Corretor:</label>
            <input pInputText id="campo-corretor" type="text" />
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
              <input pInputText id="campo-codigo" type="text" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-finalidade">Finalidade:</label>
             <p-select [options]="finalidades" [(ngModel)]="finalidadeSelecionada" [checkmark]="true" optionLabel="nome" optionValue="nome" [showClear]="true" placeholder="Selecione a finalidade do imóvel"  />
           </div>

            <div class="flex flex-col grow basis-0 gap-2">
             <label for="campo-tipo-imovel">Tipo do Imóvel:</label>
             <p-select [options]="tipo" [(ngModel)]="tipoSelecionado" [checkmark]="true" optionLabel="nome" optionValue="nome" [showClear]="true" placeholder="Selecione o tipo do imóvel"  />
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
              <input pInputText id="campo-cep" type="text" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-logradouro">Logradouro:</label>
              <input pInputText id="campo-logradouro" type="text" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-numero">Número:</label>
              <input pInputText id="campo-numero" type="text" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-estado">Estado:</label>
              <input pInputText id="campo-estado" type="text" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-cidade">Cidade:</label>
              <input pInputText id="campo-cidade" type="text" />
            </div>
            
            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-bairro">Bairro:</label>
              <input pInputText id="campo-bairro" type="text" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-pergunta-condominio">Em Condomínio?</label>
              <input pInputText id="campo-pergunta-condominio" type="text" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-nome-condominio">Nome Condomínio:</label>
              <input pInputText id="campo-nome-condominio" type="text" />
            </div>

            <div class="flex flex-col grow basis-0 gap-2">
              <label for="campo-complemento">Complemento:</label>
              <input pInputText id="campo-complemento" type="text" />
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
  }
}
