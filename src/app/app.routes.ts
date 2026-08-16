import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ListCondominiums } from './pages/condominiums/list/list';
import { ListBrokers } from './pages/brokers/list/list';
import { ListClients } from './pages/clients/list/list';
import { ListProperty } from './pages/propertys/list/list';
import { CreateProperty } from './pages/propertys/create/create';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path:'condominiums/list',
        component: ListCondominiums
    },
    {
        path: 'brokers/list',
        component: ListBrokers
    },
    {
        path:'clients/list',
        component: ListClients
    },
    {
        path: 'propertys/list',
        component: ListProperty
    },
    {
        path: 'propertys/create',
        component: CreateProperty
    },
];
