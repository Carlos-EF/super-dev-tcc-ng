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

  toggleMoreFilters(): void {
    if (this.showMoreFilters == false) {
      this.showMoreFilters = true;
    } else {
      this.showMoreFilters = false;
    }
  };
}
