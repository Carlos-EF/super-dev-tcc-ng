import { Component, computed, inject, model } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { NgxMaskDirective } from 'ngx-mask';
import { ToastService } from '../../../services/toast.service';
import { CondominiumFilters, CondominiumResponse, CreateCondominiumRequest } from '../../../models/condominium.model';
import { CondominiumService } from '../../../services/condominium.service';

@Component({
  selector: 'app-condominiums-list',
  imports: [
    RouterLink,
    FormsModule,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class CondominiumsList {
  private readonly formBuilder = inject(FormBuilder);
  private readonly condominiumService = inject(CondominiumService);
  private readonly toastService = inject(ToastService);

  createModal: boolean = false;

  selectedCondominium: CondominiumResponse | null = null;

  confirmModal: boolean = false;

  condominiums = model<CondominiumResponse[]>([]);

  cities = computed(() => {
    return [...new Set(this.condominiums().map(c => c.cidade))].sort();
  });

  districts = computed(() => {
    return [...new Set(this.condominiums().map(c => c.bairro))].sort();
  });

  filters: CondominiumFilters = {};

  constructor() {
    this.getAllCondominiums();
  }

  createCondominiumForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    logradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    numero: [this.formBuilder.control<number>(0), Validators.required],
    bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    cidade: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
  });

  getAllCondominiums() {
    this.condominiumService.getAll(this.filters).subscribe({
      next: (condominiums: CondominiumResponse[]) => {
        this.condominiums.set(condominiums);
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar buscar todos os condomínios:', error);
      }
    })
  }

  openCreateModal() {
    this.createModal = true;
  };

  openConfirmModal(condominium: CondominiumResponse) {
    this.selectedCondominium = condominium;
    this.confirmModal = true;
  }

  closeConfirmModal() {
    this.confirmModal = false;

    this.selectedCondominium = null;
  }

  cancelCreateModal() {
    this.createModal = false;

    this.createCondominiumForm.reset();
  };

  closeCreateModal() {
    this.createModal = false;
  };

  saveCondominium() {
    const newCondominium: CreateCondominiumRequest = {
      nome: this.createCondominiumForm.getRawValue().nome!,
      cep: this.createCondominiumForm.getRawValue().cep!,
      logradouro: this.createCondominiumForm.getRawValue().logradouro!,
      numero: this.createCondominiumForm.getRawValue().numero!,
      bairro: this.createCondominiumForm.getRawValue().bairro!,
      uf: this.createCondominiumForm.getRawValue().uf!,
      cidade: this.createCondominiumForm.getRawValue().cidade!
    }

    this.createCondominium(newCondominium);
  }

  createCondominium(condominium: CreateCondominiumRequest) {
    this.condominiumService.create(condominium).subscribe({
      next: () => {
        this.toastService.show('create', 'Condomínio');

        this.getAllCondominiums();

        this.closeCreateModal();
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar cadastrar condomínio:', error);
      }
    })
  }

  deleteCondominium(id: string) {
    this.condominiumService.delete(id).subscribe({
      next: () => {
        this.toastService.show("delete", 'Condomínio');

        this.getAllCondominiums();

        this.closeConfirmModal();
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar apagar o condomínio:', error);
      }
    })
  }

  sumTotal(id: string) {
    var total = 0;

    return total;
  }

  getDistrictValue(event: Event) {
    const district = event.target as HTMLSelectElement;

    this.filters.bairro = district.value;

    this.updateListWithFilters();
  }

  getCityValue(event: Event) {
    const city = event.target as HTMLSelectElement;

    this.filters.cidade = city.value;

    this.updateListWithFilters();
  }

  getHasPropertyValue(event: Event) {
    const hasProperty = event.target as HTMLSelectElement;

    if (hasProperty.value === "com") {
      this.filters.comImoveis = true;
    } else if (hasProperty.value === "sem") {
      this.filters.comImoveis = false;
    } else {
      this.filters.comImoveis = undefined;
    }

    this.updateListWithFilters();
  }

  private updateListWithFilters() {
    this.getAllCondominiums();
  }

  searchCep() {
    const cep: string = this.createCondominiumForm.get('cep')?.getRawValue();

    const cleanCep = cep.replace('-', '').trim();

    if (cleanCep.length == 8) {

    }
  }
}
