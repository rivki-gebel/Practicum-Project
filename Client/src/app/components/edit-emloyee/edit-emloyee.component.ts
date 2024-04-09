import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee-service/employee.service';
import { Employee } from '../../models/employeeModel';
import { PostEmployee } from '../../models/postEmployeeModel';
import { EmployeeJobService } from '../../services/employeeJob-service/employee-job.service';
import { EmployeeJob } from '../../models/employeeJobModel';
import { PostEmployeeJobModel } from '../../models/postEmployeeJobModel';
import { Job } from '../../models/JobModel';
import { JobService } from '../../services/job-service/job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-edit-emloyee',
  templateUrl: './edit-emloyee.component.html',
  styleUrl: './edit-emloyee.component.css'
})
export class EditEmloyeeComponent {
  public editEmployeeForm: FormGroup;
  public jobs: Job[] = [];
  public selectedJobs: number[] = [];
  public employeeToEdit = this._employeeService.employeeToEdit;
  public errorMessage = "This field is required";

  constructor(private formBuilder: FormBuilder, private _employeeService: EmployeeService, private _employeeJobService: EmployeeJobService,
    private fb: FormBuilder, private _jobsService: JobService, private router: Router, private _snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.editEmployeeForm = this.fb.group({
      firstName: [this.employeeToEdit.firstName, Validators.required],
      lastName: [this.employeeToEdit.lastName, Validators.required],
      identityNum: [this.employeeToEdit.identityNum, [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')]],
      startDate: [this.employeeToEdit.startDate, Validators.required],
      birthDate: [this.employeeToEdit.birthDate, Validators.required],
      gender: [this.employeeToEdit.gender, Validators.required],
      empJobs: this.fb.array([] as EmployeeJob[]),
    });
    //init the employee jobs form data 
    const empJobsFormArray = this.editEmployeeForm.get('empJobs') as FormArray;
    if (this.employeeToEdit.jobs && this.employeeToEdit.jobs.length > 0) {
      this.employeeToEdit.jobs.forEach(job => {
        empJobsFormArray.push(this.fb.group({
          id: [job.id],
          job: [job.job.id, Validators.required],
          entryDate: [new Date(job.entryDate), Validators.required],
          isManagement: [job.isManagement ? true : false, Validators.required]
        }));
        this.selectedJobs.push(job.job.id);
      });
    }
    //get the jobs names list
    this._jobsService.getJobsList().subscribe({
      next: (res) => {
        this.jobs = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  submitForm() {
    const employeeemployeeToEdit = this.editEmployeeForm.value;
    let newEmployee: PostEmployee = {
      firstName: employeeemployeeToEdit.firstName,
      lastName: employeeemployeeToEdit.lastName,
      identityNum: employeeemployeeToEdit.identityNum,
      startDate: employeeemployeeToEdit.startDate,
      birthDate: employeeemployeeToEdit.birthDate,
      gender: parseInt(employeeemployeeToEdit.gender)
    }
    // Send employee to the server
    this._employeeService.updateEmployee(this.employeeToEdit.id, newEmployee).subscribe((updatedEmployee: Employee) => {
      // Extract and send each job to the server separately
      const empJobsFormArray = this.editEmployeeForm.get('empJobs') as FormArray;
      empJobsFormArray.controls.forEach(jobForm => {
        const jobToEdit = jobForm.value
        if (jobToEdit.id) {
          // Update existing job
          const updatedJob: PostEmployeeJobModel = {
            jobId: jobToEdit.job,
            employeeId: updatedEmployee.id,
            entryDate: jobToEdit.entryDate,
            isManagement: jobToEdit.isManagement
          };
          // Send updated job to the server
          this._employeeJobService.updateJob(jobToEdit.id, updatedJob).subscribe((updatedJob: EmployeeJob) => {
            this._employeeService.getEmployeesList().subscribe();
          });
        } else {
          const newJob: PostEmployeeJobModel = {
            jobId: jobToEdit.job,
            employeeId: updatedEmployee.id,
            entryDate: jobToEdit.entryDate,
            isManagement: jobToEdit.isManagement
          };
          // Send new job to the server
          this._employeeJobService.addJob(newJob).subscribe((createdJob: EmployeeJob) => {
            this._employeeService.getEmployeesList().subscribe();
          });
        }
      });
      this.router.navigate(['/all-details']);
      this._snackBar.open("Updated successfully!", "Ok", {
        horizontalPosition: 'left',
        duration: 3000
      })
    });
   
  }

  addJobForm(): void {
    const jobForm = this.fb.group({
      id: [undefined],
      job: [null, Validators.required],
      entryDate: ['', Validators.required],
      isManagement: [false, Validators.required]
    });
    const empJobs = this.editEmployeeForm.get('empJobs') as FormArray;
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
    const empJobs = this.editEmployeeForm.get('empJobs') as FormArray;
    const jobForm = empJobs.at(index);
    // Check if the job is an existing job (already saved on the server)
    const isExistingJob = jobForm.get('id').value !== undefined;
    if (isExistingJob) {
      // Remove the job ID from the selectedJobs array
      const jobId = jobForm.get('job').value;
      this.selectedJobs = this.selectedJobs.filter(id => id !== jobId);
      // If it's an existing job, delete it from the server
      const jobIdToDelete = jobForm.get('id').value;
      this._employeeJobService.deleteJob(jobIdToDelete).subscribe();
    }
    // Remove the job form from the local form array and the UI
    empJobs.removeAt(index);
  }

  filterStartDate = (date: Date): boolean => {
    const startDate = new Date(this.editEmployeeForm.get('startDate').value);
    return !startDate || date >= startDate;
  };
  onSelectionChange(event: MatSelectChange, index: number) {
    this.selectedJobs[index]=event.value;    
  };
  getBackButtonStyle() {
    if (!this.editEmployeeForm.valid) {
      return { 'background-color': 'red', 'color': 'white' };
    }
    return {};
  }
 
}



