import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { ClientsService } from '../../../services/clients.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ClientResponse, ClientsFilters, ClientWithInterestResponse, CreateClientRequest, CreateInterestedRequest, EditClientRequest, EditInterestedRequest, InterestedResponse, PaginatedClientResponse } from '../../../models/clients.model';
import { FinalityTypes } from '../../../types/finality.types';
import { PropertyTypes } from '../../../types/property.types';
import { CONTACT_TYPES, ContactTypes } from '../../../types/contact.types';
import { CLIENTS_TYPES, ClientsTypes } from '../../../types/clients.types';
import { NgxMaskDirective } from 'ngx-mask';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    DatePipe
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

  contactTypes = [...CONTACT_TYPES];

  clientTypes = [...CLIENTS_TYPES];

  selectedClient: ClientWithInterestResponse | null = null;

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

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
    tipo: [null as ClientsTypes | null, [Validators.required]],
    como_encontrou: [null as ContactTypes | null, [Validators.required]]
  });

  interestedForm = this.formBuilder.group({
    finalidade: [null as FinalityTypes | null],
    procura: [null as PropertyTypes | null],
    preferencia: [null as string | null, [Validators.maxLength(60)]]
  });

  constructor() {
    this.getAllClients();
  }

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

  openConfirmModal(client: ClientWithInterestResponse) {
    this.selectedClient = client;

    this.confirmModal = true;
  }

  closeConfirmModal() {
    this.confirmModal = false;

    this.selectedClient = null;
  }

  closeModal() {
    this.isEditMode = false;

    this.selectedClient = null;

    this.openModal = false;

    this.clientForm.reset();

    this.interestedForm.reset();
  };

  cancelModal() {
    this.isEditMode = false;

    this.selectedClient = null;

    this.openModal = false;

    this.clientForm.reset();

    this.interestedForm.reset();
  };

  openEditModal(client: ClientWithInterestResponse) {
    this.clientForm.patchValue({
      nome: client.nome,
      codigo: client.codigo,
      numero: client.numero,
      email: client.email,
      tipo: client.tipo,
      como_encontrou: client.como_encontrou
    });

    if (client.interesse) {
      this.interestedForm.patchValue({
        finalidade: client.interesse.finalidade,
        procura: client.interesse.procura,
        preferencia: client.interesse.preferencia,
      });
    } else {
      this.interestedForm.reset()
    }

    this.clientForm.get('codigo')?.disable();

    this.clientForm.get('tipo')?.disable();

    this.selectedClient = client;

    this.isEditMode = true;

    this.openModal = true;
  };

  saveClient() {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();

      return;
    };

    if (this.isEditMode && this.selectedClient) {
      const editClient: EditClientRequest = {
        nome: this.clientForm.getRawValue().nome!,
        numero: this.clientForm.getRawValue().numero!,
        email: this.clientForm.getRawValue().email!,
        como_encontrou: this.clientForm.getRawValue().como_encontrou!,
      };

      this.editClient(this.selectedClient.id, editClient);
    } else {
      const newClient: CreateClientRequest = {
        nome: this.clientForm.getRawValue().nome!,
        codigo: this.clientForm.getRawValue().codigo!,
        numero: this.clientForm.getRawValue().numero!,
        email: this.clientForm.getRawValue().email!,
        tipo: this.clientForm.getRawValue().tipo!,
        como_encontrou: this.clientForm.getRawValue().como_encontrou!,
      };

      this.createClient(newClient);
    }
  };

  createClient(client: CreateClientRequest) {
    this.clientService.create(
      client
    ).subscribe({
      next: (client: ClientResponse) => {
        if (client.tipo == 'Interessado') {
          this.createInterestedClient(client.id);
        } else {
          this.toastService.show('create', 'Cliente');

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

  editClient(
    id: string,
    client: EditClientRequest
  ) {
    this.clientService.edit(id, client).subscribe({
      next: (edited: ClientResponse) => {
        if (edited.tipo == 'Interessado') {
          this.editInterestedClient(edited.id);
        } else {
          this.toastService.show('edit', 'Cliente');

          this.getAllClients();

          this.clientForm.reset();

          this.interestedForm.reset();

          this.openModal = false;
        }
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar editar os dados do cliente:', error);
      }
    })
  }

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
        this.toastService.show('create', 'Cliente');

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

  editInterestedClient(
    id: string
  ) {
    const editInterestedData: EditInterestedRequest = {
      finalidade: this.interestedForm.getRawValue().finalidade!,
      procura: this.interestedForm.getRawValue().procura!,
      preferencia: this.interestedForm.getRawValue().preferencia!,
    }

    this.clientService.editInterested(id, editInterestedData).subscribe({
      next: (interested: InterestedResponse) => {
        this.toastService.show('edit', 'Cliente');

        this.getAllClients();

        this.clientForm.reset();

        this.interestedForm.reset();

        this.openModal = false;
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar editar os dados do interessado:', error);
      }
    });
  }

  deleteClient(id: string) {
    this.clientService.delete(id).subscribe({
      next: () => {
        this.toastService.show("delete", 'Cliente');

        this.getAllClients();

        this.closeConfirmModal();
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar apagar o cliente:', error);
      }
    })
  };

  clearFilters() {
    this.filters = {};

    this.searchInput.nativeElement.value = '';

    this.page.set(1);

    this.getAllClients();
  };

  getSearchValue(event: Event) {
    const search = event.target as HTMLInputElement;

    this.page.set(1);

    this.busca.next(search.value);
  };

  changePerPagevalue(event: Event) {
    const perPageCount = +(event.target as HTMLSelectElement).value;

    this.perPage.set(perPageCount);

    this.page.set(1);

    this.getAllClients();
  };

  previousPage(): void {
    if (this.page() > 1) {
      this.page.update(p => p - 1);

      this.getAllClients();
    }
  };

  nextPage(): void {
    const totalPages = this.clients()?.total_paginas ?? 1;

    if (this.page() < totalPages) {
      this.page.update(p => p + 1);

      this.getAllClients();
    }
  };
}
