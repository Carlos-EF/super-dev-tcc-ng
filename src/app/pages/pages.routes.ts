import { Routes } from '@angular/router';
import { ImovelList } from './imoveis/list';
import { ImovelCreate } from './imoveis/create';
import { PessoasList } from './pessoas/list';
import { CorretorCreate } from './pessoas/corretor/create';
import { ClienteCreate } from './pessoas/cliente/create';
import { CorretorEdit } from './pessoas/corretor/edit';
import { ClienteEdit } from './pessoas/cliente/edit';

export default [
    { path: 'imoveis', component: ImovelList},
    { path: 'imoveis/cadastrar', component: ImovelCreate},
    { path: 'pessoas', component: PessoasList},
    { path: 'pessoas/corretor/cadastrar', component: CorretorCreate},
    { path: 'pessoas/corretor/editar/:id', component: CorretorEdit},
    { path: 'pessoas/cliente/cadastrar', component: ClienteCreate},
    { path: 'pessoas/cliente/editar/:id', component: ClienteEdit},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
