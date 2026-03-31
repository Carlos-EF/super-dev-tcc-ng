import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit',
  imports: [
    InputMaskModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    DatePickerModule,
    AutoCompleteModule,
    FormsModule
  ],
  template: `
   <div class="card flex flex-col p-2 gap-2">
    <div class="font-bold text-xl">Informações Necessárias: <span class="text-red-500">*</span></div>
    <div class="flex flex-col basis-0 gap-2">
      <label for="">Nome Completo: <span class="text-red-500">*</span></label>
      <input type="text" pInputText placeholder="Digite o nome completo do corretor.">
    </div>

    <div class="flex flex-wrap gap-6">
      <div class="flex flex-col basis-0 gap-2">
        <label for="campo-codigo">Código: <span class="text-red-500">*</span></label>
        <input pInputText id="campo-codigo" type="text" placeholder="Digite o código de referência do corretor." />
      </div>

      <div class="flex flex-col basis-0 gap-2">
        <label for="">Celular: <span class="text-red-500">*</span></label>
        <p-inputmask mask="(99) 99999-9999" placeholder="(00) 00000-0000" />
      </div>
        
      <div class="flex flex-col basis-0 grow gap-2">
        <label for="">E-Mail: <span class="text-red-500">*</span></label>
        <input type="email" pInputText placeholder="Digite o e-mail do corretor.">
      </div>

      <div class="flex flex-col basis-0 gap-2">
        <label for="">CRECI: <span class="text-red-500">*</span></label>
        <p-inputnumber [maxlength]="5" placeholder="Digite o CRECI do corretor."/>
      </div>
    </div>

    <div class="flex flex-col mt-3 mb-2 gap-3">
      <div class="font-bold text-xl">Informações Pessoais: <span class="text-sm text-surface-500">(Opcional)</span></div>
      <div class="flex flex-wrap gap-4">
        <div class="flex flex-col grow gap-2">
          <label for="">Data de Nascimento:</label>
          <p-date-picker dateFormat="dd/mm/yy" placeholder="Informe a data de nascimento do corretor."/>
        </div>
      
        <div class="flex flex-col w-full basis-0 gap-2">
          <label for="">RG:</label>
          <p-input-mask mask="9.999.999" placeholder="0.000.000" />
        </div>
        
        <div class="flex flex-col w-full basis-0 gap-2">
          <label for="">CPF:</label>
          <p-inputmask mask="999.999.999-99" placeholder="000.000.000-00" />
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
  `
})
export class CorretorEdit {
    constructor(
    private router: Router
  ) {

  }
  
  salvar() {
    this.router.navigate(["/pages/pessoas"])
  }
}
