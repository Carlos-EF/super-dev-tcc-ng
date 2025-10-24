import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { ImovelList } from './imoveis/list';
import { ImovelCreate } from './imoveis/create';
import { PessoasList } from './pessoas/list';
import { CorretorCreate } from './pessoas/corretor/create';
import { ClienteCreate } from './pessoas/cliente/create';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'imoveis', component: ImovelList},
    { path: 'imoveis/cadastrar', component: ImovelCreate},
    { path: 'pessoas', component: PessoasList},
    { path: 'pessoas/corretor/cadastrar', component: CorretorCreate},
    { path: 'pessoas/cliente/cadastrar', component: ClienteCreate},
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
