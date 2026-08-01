import { Component, inject, model } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ToastService } from '../../../services/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BrokerService } from '../../../services/broker.service';
import { SortType } from '../../../types/sort.types';
import { BrokerFilters, BrokerResponse, CreateBrokerRequest, EditBrokerRequest, PaginatedBrokerResponse } from '../../../models/broker.model';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class BrokersList {
  private readonly formBuilder = inject(FormBuilder);
  private readonly brokerService = inject(BrokerService);
  private readonly toastService = inject(ToastService);

  confirmModal: boolean = false;

  busca = new Subject<string>();

  openModal: boolean = false;

  isEditMode: boolean = false;

  perPage = model(10);

  page = model(1);

  sortDirection: SortType = 'asc';

  filters: BrokerFilters = {};

  brokers = model<PaginatedBrokerResponse>(
    {
      corretores: [],
      pagina: 1,
      por_pagina: 10,
      total: 0,
      total_paginas: 0
    }
  );

  brokersForFilter = model<PaginatedBrokerResponse>(
    {
      corretores: [],
      pagina: 1,
      por_pagina: 10,
      total: 0,
      total_paginas: 0
    }
  );

  selectedBroker: BrokerResponse | null = null;

  brokerForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4),]],
    creci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    numero: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(60)]],
    data_nascimento: [null as string | null, [Validators.minLength(10), Validators.maxLength(10)]],
    rg: [null as string | null, [Validators.minLength(9), Validators.maxLength(9)]],
    cpf: [null as string | null, [Validators.minLength(14), Validators.maxLength(14)]]
  });

  constructor() {
    this.getAllBrokers();
  }

  ngOnInit() {
    this.busca.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(
      resultado => {
        this.filters.busca = resultado;
        this.getAllBrokers();
      }
    )
  }

  getAllBrokers() {
    this.brokerService.getAll(
      this.filters,
      this.page(),
      this.perPage()
    ).subscribe({
      next: (brokers: PaginatedBrokerResponse) => {
        this.brokers.set(brokers);
        this.brokersForFilter.set(brokers);
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar buscar todos os corretores:', error);
      }
    })
  };

  openCreateModal() {
    this.isEditMode = false;

    this.openModal = true;
  };

  openConfirmModal(broker: BrokerResponse) {
    this.selectedBroker = broker;
    this.confirmModal = true;
  }

  closeConfirmModal() {
    this.confirmModal = false;

    this.selectedBroker = null;
  }

  cancelModal() {
    this.isEditMode = false;

    this.selectedBroker = null;

    this.openModal = false;

    this.brokerForm.reset();
  };

  closeModal() {
    this.isEditMode = false;

    this.selectedBroker = null;

    this.openModal = false;
  };

  openEditModal(broker: BrokerResponse) {
    this.brokerForm.patchValue({
      nome: broker.nome,
      creci: broker.creci,
      numero: broker.numero,
      email: broker.email,
      rg: broker.rg,
      data_nascimento: broker.data_nascimento,
      cpf: broker.cpf,
    });

    this.selectedBroker = broker;

    this.isEditMode = true;

    this.openModal = true;
  };

  saveBroker() {
    if (this.brokerForm.invalid) {
      this.brokerForm.markAllAsTouched();

      return;
    }

    if (this.isEditMode && this.selectedBroker) {
      const editBroker: EditBrokerRequest = {
        nome: this.brokerForm.getRawValue().nome!,
        creci: this.brokerForm.getRawValue().creci!,
        numero: this.brokerForm.getRawValue().numero!,
        email: this.brokerForm.getRawValue().email!,
        data_nascimento: this.brokerForm.getRawValue().data_nascimento!,
        rg: this.brokerForm.getRawValue().rg!,
        cpf: this.brokerForm.getRawValue().cpf!
      }

      this.editBroker(this.selectedBroker.id, editBroker);
    } else {

      const newBroker: CreateBrokerRequest = {
        nome: this.brokerForm.getRawValue().nome!,
        creci: this.brokerForm.getRawValue().creci!,
        codigo: this.brokerForm.getRawValue().codigo!, 
        numero: this.brokerForm.getRawValue().numero!,
        email: this.brokerForm.getRawValue().email!,
        data_nascimento: this.brokerForm.getRawValue().data_nascimento!,
        rg: this.brokerForm.getRawValue().rg!,
        cpf: this.brokerForm.getRawValue().cpf!
      }

      this.createBroker(newBroker);
    }
  };

  createBroker(broker: CreateBrokerRequest) {
    this.brokerService.create(broker).subscribe({
      next: (broker: BrokerResponse) => {
        this.toastService.show('create', 'corretor');

        this.getAllBrokers();

        this.brokerForm.reset();

        this.openModal = false;
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar criar o corretor:', error);
      }
    });
  };

  editBroker(id: string, broker: EditBrokerRequest) {
    this.brokerService.edit(id, broker).subscribe({
      next: (broker: BrokerResponse) => {
        this.toastService.show('edit', 'corretor');

        this.getAllBrokers();

        this.brokerForm.reset();

        this.openModal = false;
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar editar o corretor:', error);
      }
    });
  };

  deleteBroker(id: string) {
    this.brokerService.Delete(id).subscribe({
      next: () => {
        this.toastService.show('delete', 'corretor');

        this.getAllBrokers();

        this.confirmModal = false;
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar deletar o corretor:', error);
      }
    });
  };
}
