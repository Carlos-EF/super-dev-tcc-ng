import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FinalityTypes } from '../../../types/finality.types';
import { PropertyTypes } from '../../../types/property.types';
import { FurnishedTypes, FurnitureTypes } from '../../../types/furnished.types';
import { ZoningTypes } from '../../../types/zoning.types';

@Component({
  selector: 'app-create',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create.html',
  styleUrl: './create.scss',
})
export class CreateProperty {
  private readonly formBuilder = inject(FormBuilder);

  propertyForm = this.formBuilder.group({
    proprietario: [null as string | null],
    corretor: [null as string | null],
    codigo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    finalidade: [null as FinalityTypes | null, Validators.required],
    tipo: [null as PropertyTypes | null, Validators.required],
    em_condominio: [false, Validators.required],
    condominio: [null as string | null],
    cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    logradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    numero: [null as number | null, Validators.required],
    bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    cidade: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    complemento: [null as string | null, Validators.maxLength(60)],
    valor: [null as number | null],
    valor_iptu: [null as number | null],
    valor_condominio: [null as number | null]
  });

  houseForm = this.formBuilder.group({
    imovel_id: ['', Validators.required],
    metragem: [null as number | null],
    quartos: [null as number | null],
    suites: [null as number | null],
    banheiros: [null as number | null],
    garagens: [null as number | null],
    andares: [null as number | null],
    salas: [null as number | null],
    esta_mobiliado: [null as FurnishedTypes | null],
    mobilia: [null as FurnitureTypes[] | null]
  });

  apartmentForm = this.formBuilder.group({
    imovel_id: ['', Validators.required],
    metragem: [null as number | null],
    quartos: [null as number | null],
    suites: [null as number | null],
    banheiros: [null as number | null],
    garagens: [null as number | null],
    andares: [null as number | null],
    salas: [null as number | null],
    esta_mobiliado: [null as FurnishedTypes | null],
    mobilia: [null as FurnitureTypes[] | null]
  });

  landForm = this.formBuilder.group({
    imovel_id: ['', Validators.required],
    area_total: [null as number | null],
    medida_esquerda: [null as number | null],
    medida_direita: [null as number | null],
    medida_frente: [null as number | null],
    medida_fundo: [null as number | null],
    zoneamento: [null as ZoningTypes | null],
    coeficiente: [null as number | null]
  });
}
