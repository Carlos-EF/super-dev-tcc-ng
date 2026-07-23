import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { NgxMaskDirective } from 'ngx-mask';

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

  createCondominiumForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    cep: ['', [Validators.maxLength(9)]],
    logradouro: ['', [Validators.minLength(3), Validators.maxLength(60)]],
    numero: [this.formBuilder.control<number>(0), Validators.required],
    bairro: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    cidade_uf: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]]
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

  searchCep() {
    const cep: string = this.createCondominiumForm.get('cep')?.getRawValue();

    const cleanCep = cep.replace('-', '').trim();

    if (cleanCep.length == 8) {
      
    }
  }
}
