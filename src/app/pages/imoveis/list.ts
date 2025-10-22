import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

export interface ImovelResponse {
  nome: string;
  valor: number;
  caracteristicas: string[]
}

@Component({
  selector: 'app-list',
  imports: [
    ButtonModule,
    RouterLink,
    ImageModule,
    TagModule,
  ],
  template: `
    <div class="flex justify-end">
      <p-button
      icon="pi pi-plus"
      label="Cadastrar"
      severity="success"
      routerLink="cadastrar"/>
    </div>

     <!-- Para fazer o modelo de listagem -->
      @for(imovel of imoveis; track imovel) {
    <div class="bg-gray-900 border-round mt-3 pb-2 pl-2 w-full">

      <div class="flex flex-row w-full">
      <div class="flex justify-between w-full">
        <div class="border-r-2 mt-2 mr-3 p-4 pl-2">
          <p-image src="https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg" width="220"/>
        </div>
        <div class="mt-2 mr-3 w-full">
          <div class="flex gap-2 items-center">
            <p-tag
            class="max-h-min mt-2"
            value="Codigo Imóvel" 
            [rounded]="true"/>
            <h3><strong class="m-0 text-2x1">{{imovel.nome}}</strong></h3>
          </div>
        <div><h5>Localização Imóvel</h5></div>
        <div><h2><strong class="text-primary">R$ {{imovel.valor}}</strong></h2></div>
        <div class="flex gap-5 flex-wrap flex-row">
          @for (caracteristica of imovel.caracteristicas; track caracteristica) {

            <p-tag 
            value="{{caracteristica}}"
            severity="secondary" />
          } 
        </div>
      </div>
      <div class="flex border-l-2 mt-2 mr-3 items-center">
        <div class="flex flex-col justify-between w-full items-end ml-5 gap-4">
          <p-button
          icon="pi pi-search"
          severity="info"
          label="Detalhes" />
          <p-button
          icon="pi pi-pencil"
          severity="warn"
          label="Editar" />
          <p-button
          icon="pi pi-trash"
          severity="danger"
          label="Apagar" />
        </div>
      </div>
    </div>
  </div>
</div>
      }
  `,
  styles: ``
})
export class ImovelList {
  imoveis:ImovelResponse[];
  constructor() {
    this.imoveis = [
      {
        nome: "Residencial Batatinha",
        valor: 1200000,
        caracteristicas: ["2 quartos", "1 banheiro"]
      },
      {
        nome: "Residencial CAP",
        valor: 100000,
        caracteristicas: ["2 quartos", "1 suíte", "1 vaga"]
      }
    ]
  }
}
