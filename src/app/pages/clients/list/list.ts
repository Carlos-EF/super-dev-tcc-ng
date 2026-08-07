import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { ClientsService } from '../../../services/clients.service';
import { Subject } from 'rxjs';
import { ClientsFilters, PaginatedClientResponse } from '../../../models/clients.model';

@Component({
  selector: 'app-list',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ClientsList {
  private readonly formBuilder = inject(FormBuilder);
  private readonly clientService = inject(ClientsService);
  private readonly toastService = inject(ToastService);

  confirmModal: boolean = false;

  busca = new Subject<string>();

  openModal: boolean = false;

  isEditMode: boolean = false;

  perPage = model(10);

  page = model(1);

  filters: ClientsFilters = {};

  clients = model<PaginatedClientResponse>(
    {
      clientes: [],
      pagina: 1,
      por_pagina: 10,
      total: 0,
      total_paginas: 0
    }
  )
}
