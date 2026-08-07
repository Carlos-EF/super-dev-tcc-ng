import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { ClientsService } from '../../../services/clients.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
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

  clientForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    numero: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(60)]],
    tipo: ['', [Validators.required, Validators.maxLength(12)]],
    como_encontrou: ['', [Validators.required, Validators.maxLength(18)]]
  });

  interestedForm = this.formBuilder.group({
    finalidade: ['', [Validators.required, Validators.maxLength(7)]],
    procura: ['', [Validators.required, Validators.maxLength(11)]],
    preferencia: ['', [Validators.required, Validators.maxLength(60)]]
  });

  ngOnInit() {
    this.busca.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(
      resultado => {
        this.filters.busca = resultado;
        this.getAllClients();
      }
    )
  };

  getAllClients() {
    this.clientService.getAll(
      this.filters,
      this.page(),
      this.perPage()
    ).subscribe({
      next: (clients: PaginatedClientResponse) => {
        this.clients.set(clients)
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar buscar todos os clientes:', error);
      }
    })
  };
}
