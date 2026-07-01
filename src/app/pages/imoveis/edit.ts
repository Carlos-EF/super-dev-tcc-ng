import { ClienteResponse } from '@/models/cliente.model';
import { CondominioResponse } from '@/models/condominio.model';
import { CorretorResponse } from '@/models/corretor.model';
import { CepService } from '@/services/cep.service';
import { ClienteService } from '@/services/cliente.service';
import { CondominioService } from '@/services/condominio.service';
import { CorretorService } from '@/services/corretor.service';
import { ImovelService } from '@/services/imovel.service';
import { TIPO_CLIENTE_MODAL } from '@/types/cliente.types';
import { ESTA_EM_CONDOMINIO } from '@/types/condominio.types';
import { TIPOS_CONTATO } from '@/types/contato.types';
import { FINALIDADES } from '@/types/finalidade.types';
import { TIPOS_IMOVEL } from '@/types/imovel.types';
import { ESTA_MOBILIADO } from '@/types/mobiliado.types';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  private readonly formBuilder = inject(FormBuilder);

  proprietarios: ClienteResponse[] | undefined;

  corretores: CorretorResponse[] | undefined;

  condominios: CondominioResponse[] | undefined;

  finalidades = [...FINALIDADES];

  tipoImovel = [...TIPOS_IMOVEL];

  tiposContato = [...TIPOS_CONTATO];

  tipoCliente = [...TIPO_CLIENTE_MODAL];

  condominioValidar = [...ESTA_EM_CONDOMINIO];

  mobiliaValidar = [...ESTA_MOBILIADO];

  mostrarModalCorretor: boolean = false;

  mostrarModalProprietario: boolean = false;

  mostrarModalCondominio: boolean = false;

  mostrarModalCondominioParaEditar: boolean = false;

  condominioSelecionado: string = '';

  corretorSelecionado: string = '';

  proprietarioSelecionado: string = '';

  imovelParaEditarForm = this.formBuilder.group({
    proprietario: ['', [Validators.required]],
    corretor: ['', [Validators.required]],
    codigo: ['', [Validators.required]],
    finalidade: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    em_condominio: ['', [Validators.required]],
    condominio: [''],
    cep: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    numero: this.formBuilder.control<number | null>(null),
    estado: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    complemento: ['', [Validators.required]],
    valor: this.formBuilder.control<number | null>(null),
    valor_condominio: this.formBuilder.control<number | null>(null),
    iptu: this.formBuilder.control<number | null>(null),
    quantidade_quartos: this.formBuilder.control<number | null>(null),
    quantidade_suites: this.formBuilder.control<number | null>(null),
    quantidade_banheiros: this.formBuilder.control<number | null>(null),
    quantidade_vagas: this.formBuilder.control<number | null>(null),
    quantidade_andares: this.formBuilder.control<number | null>(null),
    quantidade_salas: this.formBuilder.control<number | null>(null),
    esta_mobiliado: ['', [Validators.required]]
  });

  clienteForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    como_encontrou: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  corretorForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
    codigo: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    creci: ['', [Validators.required]],
    dataNascimento: [null],
    rg: [null],
    cpf: [null],
  });

  condominioForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    cep: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    numero: this.formBuilder.control<number | null>(null),
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });

  condominioParaEditarForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    cep: ['', [Validators.required]],
    logradouro: ['', [Validators.required]],
    numero: this.formBuilder.control<number | null>(null),
    bairro: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  });

  dadosAdicionaisForm = this.formBuilder.group({});

  idParaEditar: string = '';

  constructor(
    private router: Router,
  ) {
    this.idParaEditar = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  buscarCorretores() {
    this.corretorService.getAll().subscribe({
      next: (corretores: CorretorResponse[]) => {
        this.corretores = corretores;
        console.log(corretores);

      },
      error: (erro: Error) => {
        console.error('Erro ao buscar corretores:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar a lista de corretores.'
        });
      }
    });
  }

  buscarProprietarios() {
    this.clienteService.getAll().subscribe({
      next: (clientes: ClienteResponse[]) => {
        this.proprietarios = clientes.filter(cliente => cliente.tipo != 'Interessado');
      },
      error: (erro: Error) => {
        console.error('Erro ao buscar clientes:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar a lista de clientes do tipo "Proprietário" e "Locatário".'
        });
      }
    });
  }

  buscarCondominios() {
    this.condominioService.getAll().subscribe({
      next: (condominios: CondominioResponse[]) => {
        this.condominios = condominios
      },
      error: (erro: Error) => {
        console.error('Erro ao buscar condomínios:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar a lista de condomínios.'
        })
      }
    })
  }
}
