import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { DialogData } from '../delete-dialog/delete-dialog.component';
import { JobService } from '../../services/job-service/job.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { PostJob } from '../../models/jobPostModel';

@Component({
  selector: 'app-add-job-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, MatFormFieldModule, MatButtonModule, MatInputModule,ReactiveFormsModule
  ],
  templateUrl: './add-job-dialog.component.html',
  styleUrl: './add-job-dialog.component.css'
})
export class AddJobDialogComponent {
  jobForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _jobService: JobService, private formBuilder: FormBuilder,
  ) {
    this.jobForm = this.formBuilder.group({
      jobName: ['', Validators.required]
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  addJob() {
    const newJob: PostJob = {
      name: this.jobForm.controls['jobName'].value
    }
    this._jobService.addJob(newJob).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
