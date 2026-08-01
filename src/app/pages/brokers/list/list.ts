import { Component, inject, model } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from '../../../services/toast.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BrokerService } from '../../../services/broker.service';
import { SortType } from '../../../types/sort.types';
import { BrokerFilters, PaginatedBrokerResponse } from '../../../models/broker.model';

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


  brokerForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    creci: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    numero: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(60)]],
    data_nascimento: [null as string | null, [Validators.minLength(10), Validators.maxLength(10)]],
    rg: [null as string | null, [Validators.minLength(9), Validators.maxLength(9)]],
    cpf: [null as string | null, [Validators.minLength(14), Validators.maxLength(14)]]
  });

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
  }
}
