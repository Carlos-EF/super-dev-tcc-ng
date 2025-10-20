import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { ImovelList } from './imoveis/list';
import { ImovelCreate } from './imoveis/create';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'imoveis', component: ImovelList},
    { path: 'imoveis/cadastrar', component: ImovelCreate},
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
