import { Component, computed, ElementRef, inject, model, Signal, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { NgxMaskDirective } from 'ngx-mask';
import { ToastService } from '../../../services/toast.service';
import { CondominiumFilters, CondominiumResponse, CreateCondominiumRequest, EditCondominiumRequest, PaginatedCondominiumResponse } from '../../../models/condominium.model';
import { CondominiumService } from '../../../services/condominium.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SearchCepService } from '../../../services/search.cep.service';
import { CepResponse } from '../../../models/cep.model';

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
  private readonly cepService = inject(SearchCepService);
  private readonly toastService = inject(ToastService);

  openModal: boolean = false;

  isEditMode: boolean = false;

  selectedCondominium: CondominiumResponse | null = null;

  confirmModal: boolean = false;

  busca = new Subject<string>();

  condominiums = model<PaginatedCondominiumResponse>();

  condominiumsForFilter = model<PaginatedCondominiumResponse>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('districtSelect') districtSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('citySelect') citySelect!: ElementRef<HTMLSelectElement>;

  districts = computed(() => {
    return [...new Set(
      (this.condominiumsForFilter()?.condominios ?? [])
        .map(c => c.bairro)
        .filter((bairro): bairro is string => !!bairro)
    )];
  });

  cities = computed(() => {
    return [...new Set(
      (this.condominiumsForFilter()?.condominios ?? [])
        .map(c => c.cidade)
        .filter((cidade): cidade is string => !!cidade)
    )];
  });

  filters: CondominiumFilters = {};

  constructor() {
    this.getAllCondominiums();
  }

  ngOnInit() {
    this.busca.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(
      resultado => {
        this.filters.busca = resultado;
        this.updateListWithFilters();
      }
    )
  }

  condominiumForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    logradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    numero: [null as number | null, Validators.required],
    bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    cidade: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
  });

  getAllCondominiums() {
    this.condominiumService.getAll(this.filters).subscribe({
      next: (condominiums: PaginatedCondominiumResponse) => {
        this.condominiums.set(condominiums);
        this.condominiumsForFilter.set(condominiums);
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar buscar todos os condomínios:', error);
      }
    })
  }

  openCreateModal() {
    this.isEditMode = false;

    this.openModal = true;
  };

  openConfirmModal(condominium: CondominiumResponse) {
    this.selectedCondominium = condominium;
    this.confirmModal = true;
  }

  closeConfirmModal() {
    this.confirmModal = false;

    this.selectedCondominium = null;
  }

  cancelModal() {
    this.isEditMode = false;

    this.selectedCondominium = null;

    this.openModal = false;

    this.condominiumForm.reset();
  };

  closeModal() {
    this.isEditMode = false;

    this.selectedCondominium = null;

    this.openModal = false;
  };

  openEditModal(condominium: CondominiumResponse) {
    this.condominiumForm.patchValue({
      nome: condominium.nome,
      cep: condominium.cep,
      logradouro: condominium.logradouro,
      cidade: condominium.cidade,
      numero: condominium.numero,
      bairro: condominium.bairro,
      uf: condominium.uf,
    });

    this.selectedCondominium = condominium;

    this.isEditMode = true;

    this.openModal = true;
  }

  saveCondominium() {
    if (this.condominiumForm.invalid) {
      this.condominiumForm.markAllAsTouched();

      return;
    }

    if (this.isEditMode && this.selectedCondominium) {
      const editCondominium: EditCondominiumRequest = {
        nome: this.condominiumForm.getRawValue().nome!,
        cep: this.condominiumForm.getRawValue().cep!,
        logradouro: this.condominiumForm.getRawValue().logradouro!,
        numero: this.condominiumForm.getRawValue().numero!,
        bairro: this.condominiumForm.getRawValue().bairro!,
        uf: this.condominiumForm.getRawValue().uf!,
        cidade: this.condominiumForm.getRawValue().cidade!
      }

      this.editCondominium(this.selectedCondominium.id, editCondominium);
    } else {

      const newCondominium: CreateCondominiumRequest = {
        nome: this.condominiumForm.getRawValue().nome!,
        cep: this.condominiumForm.getRawValue().cep!,
        logradouro: this.condominiumForm.getRawValue().logradouro!,
        numero: this.condominiumForm.getRawValue().numero!,
        bairro: this.condominiumForm.getRawValue().bairro!,
        uf: this.condominiumForm.getRawValue().uf!,
        cidade: this.condominiumForm.getRawValue().cidade!
      }

      this.createCondominium(newCondominium);
    }
  }

  createCondominium(condominium: CreateCondominiumRequest) {
    this.condominiumService.create(condominium).subscribe({
      next: () => {
        this.toastService.show('create', 'Condomínio');

        this.getAllCondominiums();

        this.closeModal();
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar cadastrar condomínio:', error);
      }
    })
  }

  editCondominium(id: string, condominium: EditCondominiumRequest) {
    this.condominiumService.edit(id, condominium).subscribe({
      next: () => {
        this.toastService.show('edit', 'Condomínio');

        this.getAllCondominiums();

        this.closeModal();

        this.isEditMode = false;

        this.selectedCondominium = null;
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar editar condomínio:', error);
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

  clearFilters() {
    this.filters = {};

    this.searchInput.nativeElement.value = '';
    this.citySelect.nativeElement.value = '';
    this.districtSelect.nativeElement.value = '';

    this.updateListWithFilters();
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

  getSearchValue(event: Event) {
    const search = event.target as HTMLInputElement;

    this.busca.next(search.value);
  }

  private updateListWithFilters() {
    const original = this.condominiumsForFilter();

    if (!original) return;

    let condominios = [...original.condominios];

    if (this.filters.busca?.trim()) {
      const busca = this.filters.busca.toLowerCase().trim();
      condominios = condominios.
        filter(c => c.nome.
          toLowerCase().includes(busca) || c.cidade.toLowerCase().includes(busca) || c.bairro.toLowerCase().includes(busca));
    }

    if (this.filters.cidade) {
      condominios = condominios.
        filter(c => c.cidade === this.filters.cidade);
    }
    if (this.filters.bairro) {
      condominios = condominios.
        filter(c => c.bairro === this.filters.bairro);
    }

    this.condominiums.set({ 
      ...original, 
      condominios, 
      total: condominios.length });
  }


  searchCep() {
    const cep: string = this.condominiumForm.get('cep')?.getRawValue();

    const cleanCep = cep.replace('-', '').trim();

    if (cleanCep.length == 8) {
      this.cepService.get(cleanCep).subscribe({
        next: (response: CepResponse) => {
          return this.condominiumForm.patchValue({
            logradouro: response.street,
            bairro: response.neighborhood,
            cidade: response.city,
            uf: response.state
          });
        },
        error: (error: Error) => {
          return console.log('Ocorreu um erro ao buscar o CEP:', error);
        }
      })
    }
  }
}
