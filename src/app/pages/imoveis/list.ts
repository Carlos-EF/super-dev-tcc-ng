import { ImagensImovelResponse, ImovelResponse } from '@/models/imovel.model';
import { ImovelService } from '@/services/imovel.service';
import { Component, inject, model } from '@angular/core';
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
    DeleteButton,
  ],
  template: `
  <div>
    <p-button
    icon="pi pi-plus"
    label="Cadastrar"
    severity="success"
    routerLink="cadastrar"
     />
  </div>
  @for (imovel of imoveis(); track imovel.id) {
<p-card
  class="p-0 mt-3 mb-3 border-r-2 border-l-2"
  [class]="{
    'border-primary': imovel.status === 'ATIVO',
    'border-gray-900': imovel.status === 'INATIVO'
  }">

  <div class="flex flex-col gap-2 p-3">
    <div class="flex items-stretch w-full">
      <div class="w-64 border-r-2 pr-4 mr-4 flex items-center justify-center flex-shrink-0">
        <!-- <p-image src="{{imovel.fotoCapa}}" width="220" /> -->
      </div>

      <div class="flex=1 w-full bg-surface-900 mt-3 p-3"
      [class]="{
      'opacity-50': imovel.status === 'INATIVO'
       }">

        <div class="flex items-center gap-3">
          <p-tag
            [value]="imovel.codigo"
            [rounded]="true" />

          <span class="text-xl font-semibold">
              {{imovel.tipo.toLocaleUpperCase()}} PARA {{imovel.finalidade.toUpperCase()}}
          </span>

          @if (imovel.eh_mobiliado == true) {
            <p-tag
            value="mobiliado"
            severity="success"
              />
          } @else {
            <p-tag
            value="não mobiliado"
            severity="warn"
              />
          }
        </div>

        <h5 class="mb-3">
          {{imovel.logradouro}}, {{imovel.numero}}
          - {{imovel.bairro}},
          {{imovel.cidade}} - {{imovel.estado}}
        </h5>

        <h2 class="mb-4">
          <strong class="text-primary">
            {{formatarValorParaReais(imovel.valor)}}
          </strong>
        </h2>

        <div class="flex flex-wrap gap-2">
          @if (imovel.quantidade_quartos == 1) {
            <p-tag
              value="{{imovel.quantidade_quartos}} quarto"
              [rounded]="true" />
          } @else if (imovel.quantidade_quartos > 1) {
            <p-tag
              value="{{imovel.quantidade_quartos}} quartos"
              [rounded]="true" />
          }

          @if (imovel.quantidade_suites == 1) {
            <p-tag
              value="{{imovel.quantidade_suites}} suite"
              [rounded]="true" />
          } @else if (imovel.quantidade_suites > 1) {
            <p-tag
              value="{{imovel.quantidade_suites}} suites"
              [rounded]="true" />
          }

          @if (imovel.quantidade_banheiros == 1) {
            <p-tag
              value="{{imovel.quantidade_banheiros}} banheiro"
              [rounded]="true" />
          } @else if (imovel.quantidade_banheiros > 1) {
            <p-tag
              value="{{imovel.quantidade_banheiros}} banheiros"
              [rounded]="true" />
          }

          @if (imovel.quantidade_vagas == 1) {
            <p-tag
              value="{{imovel.quantidade_vagas}} vaga"
              [rounded]="true" />
          } @else if (imovel.quantidade_vagas > 1) {
            <p-tag
              value="{{imovel.quantidade_vagas}} vagas"
              [rounded]="true" />
          }

          @if (imovel.quantidade_andares == 1) {
            <p-tag
              value="{{imovel.quantidade_andares}} andar"
              [rounded]="true" />
          } @else if (imovel.quantidade_andares > 1) {
            <p-tag
              value="{{imovel.quantidade_andares}} andares"
              [rounded]="true" />
          }

          @if (imovel.quantidade_salas == 1) {
            <p-tag
              value="{{imovel.quantidade_salas}} sala"
              [rounded]="true" />
          } @else if (imovel.quantidade_salas > 1) {
            <p-tag
              value="{{imovel.quantidade_salas}} salas"
              [rounded]="true" />
          }            
        </div>
      </div>

      <div class="border-l-2 pl-4 ml-4 w-24 flex flex-col items-center justify-center gap-3 flex-shrink-0">
        @if (imovel.status == 'ATIVO') {
          <status-button
            (click)="confirmarInativacao(imovel.id)"
            [status]="imovel.status">
          </status-button>
    
          <edit-button
            routerLink="editar/{{imovel.id}}">
          </edit-button>
    
          <delete-button
            (click)="confirmarApagar(imovel.id)">
          </delete-button>
        } @else {
          <status-button
            (click)="confirmarAtivacao(imovel.id)"
            [status]="imovel.status">
          </status-button>
    
          <delete-button
            (click)="confirmarApagar(imovel.id)">
          </delete-button>
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

  imoveis = model<ImovelResponse[]>([]);

  imagensImoveis = model<ImagensImovelResponse[] | ImagensImovelResponse | null>([]);

  constructor() { }

  ngOnInit() {
    this.buscarImoveis();

    this.buscarImagensImoveis();
  }

  buscarImagensImoveis() {
    this.imovelService.getAllImages().subscribe({
      next: (imagens: ImagensImovelResponse[] | ImagensImovelResponse | null) => {
        if (imagens) {
          this.imagensImoveis.set(imagens);
        }
      },
      error: (erro: Error) => {
        console.error('Erro ao buscar as imagens dos imóveis:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao buscar as imagens dos imóveis.'
        });
      }
    })
  }

  buscarImoveis() {
    this.imovelService.getAll().subscribe({
      next: (imoveis: ImovelResponse[]) => {
        this.imoveis.set(imoveis);
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
