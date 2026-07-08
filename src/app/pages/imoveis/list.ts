import { ImovelResponse } from '@/models/imovel.model';
import { ImovelService } from '@/services/imovel.service';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { EditButton } from "@/layout/component/action buttons/edit-button";
import { StatusButton } from "@/layout/component/action buttons/status-button";
import { ConfirmationService, MessageService } from 'primeng/api';
import { DeleteButton } from "@/layout/component/action buttons/delete-button";

@Component({
  selector: 'app-list',
  imports: [
    ButtonModule,
    RouterLink,
    ImageModule,
    TagModule,
    CardModule,
    EditButton,
    StatusButton,
    DeleteButton
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
  <p-card class="p-0 mt-3 mb-3 border-primary border-r-2 border-l-2">
    <div class="bg-surface-900 mt-3 pb-2 pl-2 w-full">

      <div class="flex flex-row w-full">
      <div class="flex justify-between w-full">
        <div class="border-r-2 mt-2 mr-3 p-4 pl-2">
          <!-- <p-image src="{{imovel.fotoCapa}}" width="220"/> -->
        </div>

        <div class="mt-2 mr-3 w-full">
          <div class="flex gap-2 items-center">
            <p-tag
            class="max-h-min mt-2"
            value="{{imovel.codigo}}" 
            [rounded]="true"/>
            <h3><strong class="m-0 text-2x1">{{imovel.tipo}} para {{imovel.finalidade.toLowerCase()}}</strong></h3>
          </div>
        <div><h5>{{imovel.logradouro}}, {{imovel.numero}} - {{imovel.bairro}}, {{imovel.cidade}} - {{imovel.estado}}</h5></div>
        
        <div><h2><strong class="text-primary">{{formatarValorParaReais(imovel.valor)}}</strong></h2></div>
        
        <!-- <div class="flex gap-5 flex-wrap flex-row">
          @for (caracteristica of imovel.caracteristicas; track caracteristica) {
            <p-tag 
            value="{{caracteristica}}"
            severity="primary"
            class="mb-2" />
          } 
        </div> -->
      </div>
      
      @if (imovel.status == 'ATIVO') {
        <div class="flex border-l-2 mt-2 mr-3 items-center">
          <div class="flex flex-col justify-between w-full items-end ml-5 gap-4">
            <status-button
            (click)='confirmarInativacao(imovel.id)'
            status="{{imovel.status}}"            
             />
            <edit-button
            routerLink="editar/{{imovel.id}}"
            />
          </div>
        </div>
      } @else {
      <div class="flex border-l-2 mt-2 mr-3 items-center">
        <div class="flex flex-col justify-between w-full items-end ml-5 gap-4">
          <status-button
            (click)='confirmarAtivacao(imovel.id)'
            status="{{imovel.status}}"            
             />
          <delete-button
            (click)='confirmarApagar(imovel.id)'
          />
        </div>
      </div>
      }
    </div>
  </div>
</div>
</p-card>
      }
  `,
  styles: ``
})
export class ImovelList {
  private readonly imovelService = inject(ImovelService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  imoveis: ImovelResponse[] = [];

  constructor() { }

  ngOnInit() {
    this.buscarImoveis();
  }

  buscarImoveis() {
    this.imovelService.getAll().subscribe({
      next: (imoveis: ImovelResponse[]) => {
        this.imoveis = imoveis;
      }
    });
  }

  confirmarInativacao(id: string) {
    this.confirmationService.confirm({
      header: 'ATENÇÂO!',
      message: 'Tem certeza que deseja inativar este imóvel?',
      rejectLabel: 'Cancelar',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Inativar',
        severity: 'primary',
        icon: 'pi pi-check'
      },
      accept: () => {
        this.inativarImovel(id);
      },
      reject: () => { }
    });
  }

  confirmarAtivacao(id: string) {
    this.confirmationService.confirm({
      header: 'ATENÇÂO!',
      message: 'Tem certeza que deseja ativar este imóvel?',
      rejectLabel: 'Cancelar',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Ativar',
        severity: 'primary',
        icon: 'pi pi-check'
      },
      accept: () => {
        this.ativarImovel(id);
      },
      reject: () => { }
    });
  }

  confirmarApagar(id: string) {
    this.confirmationService.confirm({
      header: 'ATENÇÂO!',
      message: 'Tem certeza que deseja apagar este imóvel?',
      rejectLabel: 'Cancelar',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Apagar',
        severity: 'danger',
        icon: 'pi pi-check'
      },
      accept: () => {
        this.apagarImovel(id);
      },
      reject: () => { }
    });
  }

  apagarImovel(id: string) {
    this.imovelService.delete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Imóvel apagado com sucesso!'
        });

        this.buscarImoveis();
      },
      error: (erro: Error) => {
        console.error('Erro ao apagar o imóvel:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao apagar o imóvel.'
        });
      }
    });
  }

  inativarImovel(id: string) {
    this.imovelService.inactivate(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Imóvel inativado com sucesso!'
        });

        this.buscarImoveis();
      },
      error: (erro: Error) => {
        console.error('Erro ao inativar o imóvel:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao inativar o imóvel.'
        });
      }
    });
  }

  ativarImovel(id: string) {
    this.imovelService.activate(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Imóvel ativado com sucesso!'
        });

        this.buscarImoveis();
      },
      error: (erro: Error) => {
        console.error('Erro ao ativar o imóvel:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao ativar o imóvel.'
        });
      }
    });
  }

  formatarValorParaReais(valor: number): string {
    const formatador = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    var valorFormatado = formatador.format(valor);
    return valorFormatado;
  }
}
