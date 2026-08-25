import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ListCondominiums } from './pages/condominiums/list/list';
import { ListBrokers } from './pages/brokers/list/list';
import { ListClients } from './pages/clients/list/list';
import { ListProperty } from './pages/propertys/list/list';
import { CreateProperty } from './pages/propertys/create/create';
import { EditProperty } from './pages/propertys/edit/edit';
import { Auth } from './pages/auth/auth';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: 'login',
        canActivate: [guestGuard],
        component: Auth
    },
    {
        path: '',
        canActivate: [authGuard],
        children: [

            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },

            {
                path: 'home',
                component: Home
            },
            {
                path: 'condominiums/list',
                component: ListCondominiums
            },
            {
                path: 'brokers/list',
                component: ListBrokers
            },
            {
                path: 'clients/list',
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
            {
                path: 'propertys/edit/:id',
                component: EditProperty
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'inicio'
    }
];
