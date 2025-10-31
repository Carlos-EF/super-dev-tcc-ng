import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule
  ],
  template: `
  <div>
    <div class="card flex flex-col p-2 gap-3">
      <div class="flex flex-col basis-0 gap-2">
        <label for="">Nome Completo:</label>
        <input type="text" pInputText placeholder="Digite o nome completo do corretor.">
      </div>

      <div class="flex flex-wrap gap-6">
        <div class="flex flex-col basis-0 gap-2">
          <label for="campo-codigo">Código:</label>
          <input pInputText id="campo-codigo" type="text" placeholder="Digite o código de referência do corretor." />
        </div>

        <div class="flex flex-col basis-0 gap-2">
          <label for="">Celular:</label>
          <p-inputmask mask="(99) 99999-9999" placeholder="(00) 00000-0000" />
        </div>
          
        <div class="flex flex-col basis-0 grow gap-2">
          <label for="">Email:</label>
          <input type="email" pInputText placeholder="Digite o e-mail do corretor.">
        </div>

        <div class="flex flex-col basis-0 gap-2">
          <label for="">CRECI:</label>
          <p-inputnumber [maxlength]="5" placeholder="Digite o CRECI do corretor."/>
        </div>
      </div>
    </div>

    <div class="card flex flex-col p-2 gap-3">
    <div class="font-bold text-xl">Informações Pessoais: <span class="text-sm text-surface-500">(Opcional)</span></div>

    <!-- Ajustar no futuro o layout desta parte do cadastro -->
    <div class="flex flex-wrap justify-between gap-6">
      <div class="flex flex-col basis-0 gap-2">
        <label for="">RG:</label>
        <p-input-mask mask="9.999.999" placeholder="0.000.000" />
      </div>

        <div class="flex flex-col basis-0 gap-2">
          <label for="">CPF:</label>
          <p-inputmask mask="999.999.999-99" placeholder="000.000.000-00" />
        </div>
          
        <div class="flex flex-col grow gap-2">
          <label for="">Data de Nascimento:</label>
          <p-date-picker dateFormat="dd/mm/yy" placeholder="Informe a data de nascimento do corretor."/>
        </div>

        <div class="flex flex-col grow gap-2">
          <label for="">Cadastrado desde:</label>
          <p-date-picker dateFormat="dd/mm/yy"  placeholder="Informe quando o corretor foi cadastrado."/>
        </div>

        <div class="flex flex-col grow gap-2">
          <label for="">Teste DropDown:</label>
          <p-autocomplete [(ngModel)]="value" [dropdown]="true" [suggestions]="items" (completeMethod)="search($event)" />
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <p-button
      icon="pi pi-save"
      label="Salvar"
      severity="success"
      (click)="salvar()" />
    </div>
  </div>
  <!-- Ajustar no futuro o layout desta parte do cadastro -->
  `,
  styles: ``
})
export class CorretorCreate {
  items: any[];

  value: any;
  
  constructor(
    private router: Router
  ) { 
    this.items = []
  }

  salvar() {
    this.router.navigate(["/pages/pessoas"])
  }

  search(event: AutoCompleteCompleteEvent) {
    let _items = [...Array(10).keys()];

    this.items = event.query ? [...Array(10).keys()].map((item) => event.query + '-' + item) : _items;
  }
}
