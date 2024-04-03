import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'all-details', pathMatch: 'full' },
    { path: 'all-details', loadComponent: () => import('./All-details/all-details.component').then(c => c.AllDetailsComponent) },
    { path: 'action', loadChildren: () => import('./employeeManipulations/manipulation/manipulation.module').then(c => c.ManipulationModule) },
    { path: '**', component: NotFoundComponent },
];