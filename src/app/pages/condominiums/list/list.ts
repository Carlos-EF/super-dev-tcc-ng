import { Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { NgxMaskDirective } from 'ngx-mask';
import { ToastService } from '../../../services/toast.service';
import { CitiesResponse, CondominiumFilters, CondominiumResponse, CreateCondominiumRequest, DistrictsResponse, EditCondominiumRequest, PaginatedCondominiumResponse } from '../../../models/condominium.model';
import { CondominiumService } from '../../../services/condominium.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { SearchCepService } from '../../../services/search.cep.service';
import { CepResponse } from '../../../models/cep.model';
import { SortType } from '../../../types/sort.types';
import { CondTables } from '../../../types/cond.sort.types';

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

  condominiums = model<PaginatedCondominiumResponse>(
    {
      condominios: [],
      pagina: 1,
      por_pagina: 10,
      total: 0,
      total_paginas: 0
    }
  );

  condominiumsForFilter = model<PaginatedCondominiumResponse>(
    {
      condominios: [],
      pagina: 1,
      por_pagina: 10,
      total: 0,
      total_paginas: 0
    }
  );

  perPage = model(10);

  page = model(1);

  sortCollumns: CondTables = 'nome';

  sortDirection: SortType = 'asc';

  cities = model<CitiesResponse>({ cidades: [] });

  districts = model<DistrictsResponse>({ bairros: [] });

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('districtSelect') districtSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('citySelect') citySelect!: ElementRef<HTMLSelectElement>;

  filters: CondominiumFilters = {};

  constructor() {
    this.getAllCondominiums();

    this.getAllCities();

    this.getAllDisticts();
  }

  ngOnInit() {
    this.busca.pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ).subscribe(
      resultado => {
        this.filters.busca = resultado;
        this.getAllCondominiums();
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
    this.condominiumService.getAll(
      this.filters,
      this.page(),
      this.perPage(),
      this.sortCollumns,
      this.sortDirection
    ).subscribe({
      next: (condominiums: PaginatedCondominiumResponse) => {
        this.condominiums.set(condominiums);
        this.condominiumsForFilter.set(condominiums);
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar buscar todos os condomínios:', error);
      }
    })
  }

  getAllCities() {
    this.condominiumService.getAllCities().subscribe({
      next: (cities: CitiesResponse) => {
        this.cities.set(cities);
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar buscar todas as cidades:', error);
      }
    })
  }

  getAllDisticts() {
    this.condominiumService.getAllDistricts().subscribe({
      next: (districts: DistrictsResponse) => {
        this.districts.set(districts);
      },
      error: (error: Error) => {
        return console.log('Ocorreu um erro ao tentar buscar todos os bairros:', error);
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

        this.getAllCities();

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

        this.getAllCities();

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

        this.getAllCities();

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

  sortBy(column: CondTables) {
    if (this.sortCollumns === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCollumns = column; 

      this.sortDirection = 'asc';
    }

    this.getAllCondominiums();
  };

  clearFilters() {
    this.filters = {};

    this.searchInput.nativeElement.value = '';
    this.citySelect.nativeElement.value = '';
    this.districtSelect.nativeElement.value = '';

    this.page.set(1);

    this.getAllCondominiums()
  };

  getDistrictValue(event: Event) {
    const district = event.target as HTMLSelectElement;

    this.filters.bairro = district.value;

    this.page.set(1);

    this.getAllCondominiums()
  };

  getCityValue(event: Event) {
    const city = event.target as HTMLSelectElement;

    this.filters.cidade = city.value;

    this.page.set(1);

    this.getAllCondominiums();
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

    this.getAllCondominiums();
  };

  previousPage(): void {
    if (this.page() > 1) {
      this.page.update(p => p - 1);

      this.getAllCondominiums();
    }
  };

  nextPage(): void {
    const totalPages = this.condominiums()?.total_paginas ?? 1;

    if (this.page() < totalPages) {
      this.page.update(p => p + 1);

      this.getAllCondominiums();
    }
  };

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
  };
}
