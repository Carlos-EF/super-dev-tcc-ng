import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';

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
            <h3><strong class="m-0 text-2x1">Nome Imóvel</strong></h3>
          </div>
        <div><h5>Localização Imóvel</h5></div>
        <div><h2><strong class="text-primary">Valor Imóvel</strong></h2></div>
        <div class="flex gap-5 flex-wrap flex-row">
          <p-tag 
          value="caracteristicas 1"
          severity="secondary" />
          <p-tag 
          value="caracteristicas 2"
          severity="secondary" />
          <p-tag 
          value="caracteristicas 3"
          severity="secondary" />
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
  `,
  styles: ``
})
export class ImovelList {
}
