import { Component, inject, model } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from '../../../services/toast.service';
import { FormBuilder } from '@angular/forms';
import { BrokerService } from '../../../services/broker.service';
import { SortType } from '../../../types/sort.types';
import { BrokerFilters } from '../../../models/broker.model';

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
}
