import { CepService } from '@/services/cep.service';
import { ClienteService } from '@/services/cliente.service';
import { CondominioService } from '@/services/condominio.service';
import { CorretorService } from '@/services/corretor.service';
import { ImovelService } from '@/services/imovel.service';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit',
  imports: [
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    InputMaskModule,
    ButtonModule,
    StepperModule,
    InputNumberModule,
    ToastModule,
    FileUploadModule,
    DialogModule,
  ],
  template: `
    <p>
      edit works!
    </p>
  `,
  styles: ``
})
export class ImovelEdit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);
  private readonly corretorService = inject(CorretorService);
  private readonly clienteService = inject(ClienteService);
  private readonly condominioService = inject(CondominioService);
  private readonly cepService = inject(CepService);
  private readonly imovelService = inject(ImovelService);
  private readonly confirmationService = inject(ConfirmationService);

  idParaEditar: string = '';

  constructor(
    private router: Router,
  ) {
    this.idParaEditar = this.activatedRoute.snapshot.paramMap.get('id')!;
  }
}
