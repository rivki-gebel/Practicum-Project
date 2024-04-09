import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';


export const routes: Routes = [
    { path: '', redirectTo: 'all-details', pathMatch: 'full' },
    { path: 'all-details', loadComponent: () => import('./components/all-details/all-details.component').then(c => c.AllDetailsComponent) },
    { path: '', loadChildren: () => import('./employeeManipulations/manipulation-module/manipulation.module').then(c => c.ManipulationModule) },
    { path: '**', component: NotFoundComponent },
];
