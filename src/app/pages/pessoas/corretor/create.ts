import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create',
  imports: [
    InputMaskModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DatePickerModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
  <div class="card flex flex-col p-2 gap-2">
    <div class="font-bold text-xl">Informações Necessárias: <span class="text-red-500">*</span></div>
    <div class="flex flex-col basis-0 gap-2">
      <label for="">Nome Completo: <span class="text-red-500">*</span></label>
      <input type="text" pInputText placeholder="Digite o nome completo do corretor." formControlName='nome'>
    </div>

    <div class="flex flex-wrap gap-6">
      <div class="flex flex-col basis-0 gap-2">
        <label for="campo-codigo">Código: <span class="text-red-500">*</span></label>
        <input pInputText id="campo-codigo" type="text" placeholder="Digite o código de referência do corretor." formControlName='codigo'/>
      </div>

      <div class="flex flex-col basis-0 gap-2">
        <label for="">Celular: <span class="text-red-500">*</span></label>
        <p-inputmask mask="(99) 99999-9999" placeholder="(00) 00000-0000" formControlName='celular'/>
      </div>
        
      <div class="flex flex-col basis-0 grow gap-2">
        <label for="">E-Mail: <span class="text-red-500">*</span></label>
        <input type="email" pInputText placeholder="Digite o e-mail do corretor." formControlName='email'>
      </div>

      <div class="flex flex-col basis-0 gap-2">
        <label for="">CRECI: <span class="text-red-500">*</span></label>
        <p-inputnumber [maxlength]="5" placeholder="Digite o CRECI do corretor." formControlName='creci'/>
      </div>
    </div>

    <div class="flex flex-col mt-3 mb-2 gap-3">
      <div class="font-bold text-xl">Informações Pessoais: <span class="text-sm text-surface-500">(Opcional)</span></div>
      <div class="flex flex-wrap gap-4">
        <div class="flex flex-col grow gap-2">
          <label for="">Data de Nascimento:</label>
          <p-date-picker dateFormat="dd/mm/yy" placeholder="Informe a data de nascimento do corretor." formControlName='dataNascimento'/>
        </div>
      
        <div class="flex flex-col w-full basis-0 gap-2">
          <label for="">RG:</label>
          <p-input-mask mask="9.999.999" placeholder="0.000.000" formControlName='rg'/>
        </div>
        
        <div class="flex flex-col w-full basis-0 gap-2">
          <label for="">CPF:</label>
          <p-inputmask mask="999.999.999-99" placeholder="000.000.000-00" formControlName='cpf'/>
        </div>
        
      </div>
    </div>
        
    <div class="mt-3 flex justify-end">
      <p-button
      icon="pi pi-save"
      label="Salvar"
      severity="success"
      (click)="salvar()" />
    </div>
  </div>
  `,
  styles: ``
})
export class CorretorCreate {
  private readonly formBuilder = inject(FormBuilder)

  corretorForm = this.formBuilder.group({
    nome: ['', Validators.required, Validators.minLength(3), Validators.maxLength(60)],
    codigo: ['', Validators.required, Validators.minLength(5), Validators.maxLength(10)],
    celular: ['', Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    email: ['', Validators.required, Validators.maxLength(50)],
    creci: ['', Validators.required, Validators.maxLength(5)],
    dataNascimento: [''],
    rg: ['', Validators.minLength(7), Validators.maxLength(7)],
    cpf: ['', Validators.minLength(11), Validators.maxLength(11)]
  })
  constructor(
    private router: Router
  ) {

  }

  salvar() {
    this.router.navigate(["/pages/pessoas"])
  }
}
