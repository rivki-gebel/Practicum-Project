import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { EditEmloyeeComponent } from '../edit-emloyee/edit-emloyee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { NotFoundComponent } from '../../not-found/not-found.component';

const manipulationRoutes: Routes = [
  { path: 'edit-employee', component: EditEmloyeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
   RouterModule.forChild(manipulationRoutes)
  ],
  exports: [RouterModule]
})
export class ManipulationRoutingModule { }
