import { CorretorEditarRequest } from '@/models/corretor.model';
import { CorretorService } from '@/services/corretor.service';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
  <form [formGroup]="corretorEditarForm">

    <div class="card flex flex-col p-2 gap-2">
      <div class="font-bold text-xl">Informações Necessárias: <span class="text-red-500">*</span></div>
      <div class="flex flex-col basis-0 gap-2">
        <label for="">Nome Completo: <span class="text-red-500">*</span></label>
        <input type="text" pInputText placeholder="Digite o nome completo do corretor." formControlName='nome'>
      </div>
      
      <div class="flex flex-wrap gap-6">
        <div class="flex flex-col basis-0 gap-2">
          <label for="">Celular: <span class="text-red-500">*</span></label>
          <p-inputmask mask="(99) 99999-9999" placeholder="(00) 00000-0000" formControlName='celular'/>
        </div>
        
        <div class="flex flex-col basis-0 grow gap-2">
          <label for="">E-Mail: <span class="text-red-500">*</span></label>
          <input type="email" pInputText placeholder="Digite o e-mail do corretor." formControlName='email'>
        </div>
      </div>
      
      <div class="flex flex-col mt-3 mb-2 gap-3">
        <div class="font-bold text-xl">Informações Pessoais: <span class="text-sm text-surface-500">(Opcional)</span></div>
        <div class="flex flex-wrap gap-4">
          <div class="flex flex-col grow gap-2">
            <label for="">Data de Nascimento:</label>
            <p-date-picker dateFormat="dd/mm/yy" dataType="string" placeholder="Informe a data de nascimento do corretor." formControlName='dataNascimento'/>
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
  </form>
  `,
  styles: ``
})
export class CorretorEdit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly corretorService = inject(CorretorService);
  private readonly messageService = inject(MessageService);
  private readonly activatedRoute= inject(ActivatedRoute);

  corretorEditarForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    celular: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    email: ['', [Validators.required, Validators.maxLength(50)]],
    dataNascimento: [''],
    rg: ['', [Validators.minLength(7), Validators.maxLength(7)]],
    cpf: ['', [Validators.minLength(11), Validators.maxLength(11)]]
  })

  idParaEditar: string = '';

  constructor(
    private router: Router
  ) {
    this.idParaEditar = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.buscarCorretor();
  }

  buscarCorretor() {
    this.corretorService.getById(this.idParaEditar).subscribe({
      next: (corretor: CorretorEditarRequest) => {
        this.corretorEditarForm.patchValue({
          nome: corretor.nome_completo,
          celular: corretor.celular,
          email: corretor.email,
          dataNascimento: corretor.data_nascimento,
          rg: corretor.rg,
          cpf: corretor.cpf,
        })
      },
      error: (erro: Error) => {
          console.log(`Ocorreu um erro ao tentar cadastrar o corretor: ${erro}`);
          this.messageService.add({
          severity: "error",
          summary: "FALHA NA EDIÇÂO!",
          detail: `Ocorreu um erro ao tentar editar o corretor.`
        });
      }
    })
  }

  salvar() {
    const form: CorretorEditarRequest = {
      nome_completo: this.corretorEditarForm.getRawValue().nome!,
      cpf: this.corretorEditarForm.getRawValue().cpf!,
      data_nascimento: this.corretorEditarForm.getRawValue().dataNascimento!,
      rg: this.corretorEditarForm.getRawValue().rg!,
      celular: this.corretorEditarForm.getRawValue().celular!,
      email: this.corretorEditarForm.getRawValue().email!,
    };

    this.editar(form);
  }

  editar(form: CorretorEditarRequest) {
    this.corretorService.update(this.idParaEditar, form).subscribe({
      next: () => {
        this.corretorEditarForm.reset();
        this.messageService.add({
          severity: "success",
          summary: "SUCESSO!",
          detail: "Corretor editado com êxito!"
        });
        this.router.navigate(["/pages/pessoas"]);
      },
      error: (erro: Error) => {
        console.log(`Ocorreu um erro ao tentar editar o corretor: ${erro}`);
          this.messageService.add({
          severity: "error",
          summary: "FALHA NA EDIÇÂO!",
          detail: `Ocorreu um erro ao tentar editar o corretor.`
        });
      }
    })
  }
}
