import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { NgxMaskDirective } from 'ngx-mask';
import { ToastService } from '../../../services/toast.service';
import { CreateCondominiumRequest } from '../../../models/condominium.model';

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

  createModal: boolean = false;

  constructor(private toastService: ToastService) { }


  createCondominiumForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    cep: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    logradouro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    numero: [this.formBuilder.control<number>(0), Validators.required],
    bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
    cidade: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
  });

  openCreateModal() {
    this.createModal = true;
  };

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

  createCondominium(condominium: CreateCondominiumRequest) {}

  searchCep() {
    const cep: string = this.createCondominiumForm.get('cep')?.getRawValue();

    const cleanCep = cep.replace('-', '').trim();

    if (cleanCep.length == 8) {

    }
  }
}
