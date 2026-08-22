import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CompletePropertyResponse, PaginatedPropertyResponse, PropertyFilters } from '../../../models/property.model';
import { PropertysService } from '../../../services/propertys.service';
import { ToastService } from '../../../services/toast.service';
import { CondominiumService } from '../../../services/condominium.service';
import { BrokerService } from '../../../services/broker.service';
import { ClientsService } from '../../../services/clients.service';
import { BrokerResponse } from '../../../models/broker.model';
import { ClientResponse } from '../../../models/clients.model';
import { CondominiumResponse, DistrictsResponse } from '../../../models/condominium.model';
import { PROPERTY_TYPES } from '../../../types/property.types';
import { NgxMaskDirective } from 'ngx-mask';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [
    RouterLink,
    FormsModule,
    NgxMaskDirective
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListProperty {
  private readonly propertyService = inject(PropertysService);
  private readonly toastService = inject(ToastService);
  private readonly brokerService = inject(BrokerService);
  private readonly clientsService = inject(ClientsService);
  private readonly condominiumService = inject(CondominiumService);

  brokers = model<BrokerResponse[]>([]);
  owners = model<ClientResponse[]>([]);
  condominiums = model<CondominiumResponse[]>([]);
  districts = model<DistrictsResponse>({ bairros: [] });
  propertys = model<PaginatedPropertyResponse>(
    {
      imoveis: [],
      pagina: 1,
      por_pagina: 10,
      total: 0,
      total_paginas: 0
    }
  );

  PropertyTypes = [...PROPERTY_TYPES];

  perPage = model(10);

  page = model(1);

  showMoreFilters = false;

  filters: PropertyFilters = {
    busca: '',
    finalidade: undefined,
    ordem: 'recente-asc',
    tipo: undefined,
    cond: '',
    prop: '',
    corr: '',
    bairro: '',
    min_preco: undefined,
    max_preco: undefined,
    qtn_quartos: undefined,
  };

  selectedProperty: CompletePropertyResponse | null = null;

  confirmModal: boolean = false;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  busca = new Subject<string>();

  constructor() {
    this.getAllPropertys();

    this.busca.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(
      resultado => {
      }
    )
  };

  getAllPropertys() {
    this.propertyService.getAll(
      this.filters,
      this.page(),
      this.perPage()
    ).subscribe({
      next: (propertys: PaginatedPropertyResponse) => {
        this.propertys.set(propertys);
      }
    })
  };


  getAllBrokers() {
    this.brokerService.getAllForList().subscribe({
      next: (brokers: BrokerResponse[]) => {
        this.brokers.set(brokers);
      },
      error: (error: Error) => {
        console.log('Ocorreu um erro ao tentar buscar corretores:', error);
      }
    })
  };

  getAllOwners() {
    this.clientsService.getAllOwners().subscribe({
      next: (clients: ClientResponse[]) => {
        this.owners.set(clients);
      },
      error: (error: Error) => {
        console.log('Ocorreu um erro ao tentar buscar clientes:', error);
      }
    })
  };

  getAllCondominiums() {
    this.condominiumService.getAllForList().subscribe({
      next: (condominiums: CondominiumResponse[]) => {
        this.condominiums.set(condominiums);
      },
      error: (error: Error) => {
        console.log('Ocorreu um erro ao tentar buscar condomínios:', error);
      }
    })
  };

  getAllDisticts() {
    this.condominiumService.getAllDistricts().subscribe({
      next: (districts: DistrictsResponse) => {
        this.districts.set(districts);
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar buscar todos os bairros:', error);
      }
    })
  }

  deleteProperty(id: string) {
    this.propertyService.delete(id).subscribe({
      next: () => {
        this.toastService.show("delete", 'Imóvel');

        this.getAllPropertys();

        this.closeConfirmModal();
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar apagar o imóvel:', error);
      }
    })
  };

  toggleMoreFilters(): void {
    if (this.showMoreFilters == false) {
      this.showMoreFilters = true;
    } else {
      this.showMoreFilters = false;
    }
  };

  formatToBRL(currency: number): string {
    const builder = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    var result = builder.format(currency);
    return result;
  };

  previousPage(): void {
    if (this.page() > 1) {
      this.page.update(p => p - 1);

      this.getAllPropertys();
    }
  };

  nextPage(): void {
    const totalPages = this.propertys()?.total_paginas ?? 1;

    if (this.page() < totalPages) {
      this.page.update(p => p + 1);

      this.getAllPropertys();
    }
  };

  changePerPage(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);

    this.perPage.set(value); this.page.set(1);

    this.getAllPropertys();
  };

  openConfirmModal(property: CompletePropertyResponse) {
    this.selectedProperty = property;
    this.confirmModal = true;
  }

  closeConfirmModal() {
    this.confirmModal = false;

    this.selectedProperty = null;
  }

  cancelModal() {
    this.selectedProperty = null;

    this.confirmModal = false;
  };

  closeModal() {
    this.selectedProperty = null;

    this.confirmModal = false;
  };

  getSearchValue(event: Event) {
    const search = event.target as HTMLInputElement;

    this.page.set(1);

    this.busca.next(search.value);
  };

  onFinalityChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onOrderChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onTypeChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onCondChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onPropChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onCorrChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onDistrictChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onMinValueChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onMaxValueChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  onQntChange() {
    this.page.set(1);

    this.getAllPropertys();
  };

  clearFilters(): void {

    this.filters = {
      busca: '',
      finalidade: undefined,
      ordem: 'recente-asc',
      tipo: undefined,
      cond: '',
      prop: '',
      corr: '',
      bairro: '',
      min_preco: undefined,
      max_preco: undefined,
      qtn_quartos: undefined,
    };

    this.page.set(1);

    this.getAllPropertys();
  };

  get activeFiltersCount(): number {
    let count = 0;

    if (this.filters.busca) count++;

    if (this.filters.finalidade) count++;

    if (this.filters.tipo) count++;

    if (this.filters.cond) count++;

    if (this.filters.prop) count++;

    if (this.filters.corr) count++;

    if (this.filters.bairro) count++;

    if (this.filters.min_preco !== undefined) count++;

    if (this.filters.max_preco !== undefined) count++;

    if (this.filters.qtn_quartos !== undefined) count++;

    return count;
  };

  stringToNumber(
    value: string | number | null | undefined
  ): number | undefined {

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return undefined;
    }

    if (typeof value === 'number') {
      return value;
    }

    return Number(
      value
        .replace(/\./g, '')
        .replace(',', '.')
    );
  }
}
