import { Component, inject, model } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CompletePropertyResponse, PaginatedPropertyResponse } from '../../../models/property.model';
import { PropertysService } from '../../../services/propertys.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-list',
  imports: [RouterLink],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListProperty {
  private readonly propertyService = inject(PropertysService);
  private readonly toastService = inject(ToastService);

  propertys = model<PaginatedPropertyResponse>(
    {
      imoveis: [],
      pagina: 1,
      por_pagina: 10,
      total: 0,
      total_paginas: 0
    }
  );

  perPage = model(10);

  page = model(1);

  showMoreFilters = false;

  selectedProperty: CompletePropertyResponse | null = null;

  confirmModal: boolean = false;

  constructor() {
    this.getAllPropertys();
  };

  getAllPropertys() {
    this.propertyService.getAll(
      this.page(),
      this.perPage()
    ).subscribe({
      next: (propertys: PaginatedPropertyResponse) => {
        this.propertys.set(propertys);
      }
    })
  };

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
}
