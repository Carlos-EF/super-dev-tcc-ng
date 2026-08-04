import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CondominiumsList } from './pages/condominiums/list/list';
import { BrokersList } from './pages/brokers/list/list';
import { ClientsList } from './pages/clients/list/list';

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
        component: CondominiumsList
    },
    {
        path: 'brokers/list',
        component: BrokersList
    },
    {
        path:'clients/list',
        component: ClientsList
    }
];
