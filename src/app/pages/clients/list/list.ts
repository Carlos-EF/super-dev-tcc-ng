import { Component, inject, model } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { ClientsService } from '../../../services/clients.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ClientResponse, ClientsFilters, CreateClientRequest, CreateInterestedRequest, InterestedResponse, PaginatedClientResponse } from '../../../models/clients.model';
import { FinalityTypes } from '../../../types/finality.types';
import { PropertyTypes } from '../../../types/property.types';
import { ContactTypes } from '../../../types/contact.types';

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

  selectedClient: ClientResponse | null = null;

  clients = model<PaginatedClientResponse>(
    {
      clientes: [],
      pagina: 1,
      por_pagina: 10,
      total: 0,
      total_paginas: 0
    }
  );

  clientForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    numero: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(60)]],
    tipo: ['', [Validators.required, Validators.maxLength(12)]],
    como_encontrou: [null as ContactTypes, [Validators.required, Validators.maxLength(18)]]
  });

  interestedForm = this.formBuilder.group({
    finalidade: [null as FinalityTypes | null, [Validators.maxLength(7)]],
    procura: [null as PropertyTypes | null, [Validators.maxLength(11)]],
    preferencia: [null as string | null, [Validators.maxLength(60)]]
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

  openCreateModal() {
    this.isEditMode = false;

    this.clientForm.get('codigo')?.enable();

    this.clientForm.get('tipo')?.enable();

    this.openModal = true;
  };


  closeConfirmModal() {
    this.confirmModal = false;

    this.selectedClient = null;
  }


  cancelModal() {
    this.isEditMode = false;

    this.selectedClient = null;

    this.openModal = false;

    this.clientForm.reset();
  };

  openEditModal(client: ClientResponse) {
    this.clientForm.patchValue({
      nome: client.nome,
      codigo: client.codigo,
      numero: client.numero,
      email: client.email,
      tipo: client.tipo,
      como_encontrou: client.como_encontrou
    });

    this.clientForm.get('codigo')?.disable();

    this.clientForm.get('tipo')?.disable();

    this.selectedClient = client;

    this.isEditMode = true;

    this.openModal = true;
  };

  createClient(client: CreateClientRequest) {
    this.clientService.create(
      client
    ).subscribe({
      next: (client: ClientResponse) => {
        if (client.tipo == 'Interessado') {
          this.createInterestedClient(client.id);
        } else {
          this.toastService.show('create', 'cliente');

          this.getAllClients();

          this.clientForm.reset();

          this.interestedForm.reset();

          this.openModal = false;
        }
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar cadastrar os dados do cliente:', error);
      }
    })
  };

  createInterestedClient(id: string) {
    const newInterestedData: CreateInterestedRequest = {
      cliente_id: id,
      finalidade: this.interestedForm.getRawValue().finalidade!,
      procura: this.interestedForm.getRawValue().procura!,
      preferencia: this.interestedForm.getRawValue().preferencia!,
    }

    this.clientService.createInterested(
      id,
      newInterestedData
    ).subscribe({
      next: (interested: InterestedResponse) => {
        this.toastService.show('create', 'cliente');

        this.getAllClients();

        this.clientForm.reset();

        this.interestedForm.reset();

        this.openModal = false;
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar cadastrar os dados do interessado:', error);
      }
    })
  }
}
