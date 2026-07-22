import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CondominiumsList } from './pages/condominiums/list/list';

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
    }
];
