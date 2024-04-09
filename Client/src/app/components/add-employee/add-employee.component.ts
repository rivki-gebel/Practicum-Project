import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { Job } from '../../models/JobModel';
import { Employee } from '../../models/employeeModel';
import { EmployeeJobService } from '../../services/employeeJob-service/employee-job.service';
import { EmployeeJob } from '../../models/employeeJobModel';
import { PostEmployee } from '../../models/postEmployeeModel';
import { PostEmployeeJobModel } from '../../models/postEmployeeJobModel';
import { JobService } from '../../services/job-service/job.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent implements OnInit {
  public addEmployeeForm: FormGroup;
  public jobs: Job[] = [];
  public selectedJobs: number[] = [];
  public errorMessage = "This field is required";

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      identityNum: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      startDate: [Validators.required],
      birthDate: [Validators.required],
      gender: [1, Validators.required],
      empJobs: this.fb.array([] as EmployeeJob[]),
    });

    this._jobsService.getJobsList().subscribe({
      next: (res) => {
        this.jobs = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  constructor(private formBuilder: FormBuilder, private _employeeService: EmployeeService, private _employeeJobService: EmployeeJobService,
    private fb: FormBuilder, private _jobsService: JobService, private router: Router, private _snackBar: MatSnackBar) {
  }

  submitForm() {
    const employeeData = this.addEmployeeForm.value;
    let newEmployee: PostEmployee = {
      firstName: employeeData.firstName,
      lastName: employeeData.lastName,
      identityNum: employeeData.identityNum,
      startDate: employeeData.startDate,
      birthDate: employeeData.birthDate,
      gender: parseInt(employeeData.gender)
    }
    // Send employee data to the server
    this._employeeService.addEmployee(newEmployee).subscribe((createdEmployee: Employee) => {
      // Extract and send each job data to the server separately
      const empJobsFormArray = this.addEmployeeForm.get('empJobs') as FormArray;
      empJobsFormArray.controls.forEach(jobForm => {
        const jobData = jobForm.value
        const newJob: PostEmployeeJobModel = {
          jobId: jobData.job,
          employeeId: createdEmployee.id,
          entryDate: jobData.entryDate,
          isManagement: jobData.isManagement
        }
        // Send job data to the server
        this._employeeJobService.addJob(newJob).subscribe((createdJob: EmployeeJob) => {
          // Refresh the list of employees and jobs after adding a new job
          this._employeeService.getEmployeesList().subscribe();
        });
      });
      this._snackBar.open("successfully updated!", "Ok", {
        horizontalPosition: 'left',
        duration: 3000
      })
    });
    this.router.navigate(['/all-details'])

   
  }

  addJobForm(): void {
    const jobForm = this.fb.group({
      job: [null, Validators.required],
      entryDate: ['', [Validators.required,this.entryDateValidator()]],
      isManagement: [false, Validators.required]
    });
    const empJobs = this.addEmployeeForm.get('empJobs') as FormArray;
    empJobs.push(jobForm);

    jobForm.get('job').valueChanges.subscribe((value) => {
      if (value) {
        this.selectedJobs = this.selectedJobs.filter(jobId => {
          return empJobs.controls.some(control => control.get('job').value === jobId);
        });
        this.selectedJobs.push(value);
      }
    });   
  }

  removeJobForm(index: number): void {
    const empJobs = this.addEmployeeForm.get('empJobs') as FormArray;
    const removedJob = empJobs.at(index).get('job').value;
    empJobs.removeAt(index);
    this.selectedJobs = this.selectedJobs.filter(jobId => jobId !== removedJob);
  }

  filterStartDate = (date: Date): boolean => {
    const startDate = this.addEmployeeForm.get('startDate').value;
    return !startDate || date >= startDate;
  };

  entryDateValidator(): ValidatorFn {
    console.log("in validation")
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDateValue = control.value;
      const startDateValue = this.addEmployeeForm.get('startDate').value;

      if (entryDateValue && startDateValue) {
        const entryDate = new Date(entryDateValue);
        const startDate = new Date(startDateValue);

        if (entryDate < startDate) {
          console.log("valid date")
          return { 'invalidEntryDate': true };
        }
      }
      return null;
    };
  }
}

