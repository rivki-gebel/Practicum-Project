import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEmloyeeComponent } from '../edit-emloyee/edit-emloyee.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { ManipulationRoutingModule } from '../manipulation.routing/manipulation.routing.module';
import {
 MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,
} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [EditEmloyeeComponent,AddEmployeeComponent],
  imports: [
    CommonModule,MatSelectModule,MatButtonToggleModule,MatDatepickerModule,MatIconModule,MatTooltipModule
    ,MatButtonModule,MatInputModule,MatFormFieldModule,MatStepperModule,MatCardModule,ReactiveFormsModule,
    ManipulationRoutingModule,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose,MatSlideToggleModule
  ]
})
export class ManipulationModule { }
