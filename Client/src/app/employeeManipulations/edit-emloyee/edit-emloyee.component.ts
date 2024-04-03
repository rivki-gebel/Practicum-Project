import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../Employee/employee.service';
import { Employee } from '../../Employee/employeeModel';
import { PostEmployee } from '../../Employee/postEmployeeModel';
import { EmployeeJobService } from '../../EmployeeJob/employee-job.service';
import { EmployeeJob } from '../../EmployeeJob/employeeJobModel';
import { PostEmployeeJobModel } from '../../EmployeeJob/postEmployeeJobModel';
import { Job } from '../../Job/JobModel';
import { JobService } from '../../Job/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-emloyee',
  templateUrl: './edit-emloyee.component.html',
  styleUrl: './edit-emloyee.component.css'
})
export class EditEmloyeeComponent {
  public editEmployeeForm: FormGroup;
  public employeeJobs: EmployeeJob[] = [];
  public jobs: Job[] = [];
  public selectedJobs: number[] = [];
  public employeeToEdit = this._employeeService.employeeToEdit;

  constructor(private formBuilder: FormBuilder, private _employeeService: EmployeeService, private _employeeJobService: EmployeeJobService,
    private fb: FormBuilder, private _jobsService: JobService, private router: Router) {
  }
  ngOnInit(): void {
    //init the employee form data
    this.editEmployeeForm = this.fb.group({
      firstName: [this.employeeToEdit.firstName, [Validators.required, Validators.minLength(5)]],
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
        console.log("job id", job.id)
        empJobsFormArray.push(this.fb.group({
          id: [job.id],
          job: [job.job.id, Validators.required],
          entryDate: [new Date(job.entryDate), Validators.required],
          isManagement: [job.isManagement ? true : false, Validators.required]
        }));
        this.selectedJobs.push(job.job.id);
      });
    }

    //get the jobs list
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
    console.log("real emp id:", this.employeeToEdit.id);
    const employeeemployeeToEdit = this.editEmployeeForm.value;
    let newEmployee: PostEmployee = {
      firstName: employeeemployeeToEdit.firstName,
      lastName: employeeemployeeToEdit.lastName,
      identityNum: employeeemployeeToEdit.identityNum,
      startDate: employeeemployeeToEdit.startDate,
      birthDate: employeeemployeeToEdit.birthDate,
      gender: parseInt(employeeemployeeToEdit.gender)
    }
    // Send employee employeeToEdit to the server
    this._employeeService.updateEmployee(this.employeeToEdit.id, newEmployee).subscribe((updatedEmployee: Employee) => {
      console.log('Employee created:', updatedEmployee);
      console.log("updated emp id:", updatedEmployee.id);
      // Extract and send each job employeeToEdit to the server separately
      const empJobsFormArray = this.editEmployeeForm.get('empJobs') as FormArray;
      empJobsFormArray.controls.forEach(jobForm => {
        const jobToEdit = jobForm.value
        console.log("updated job id:", jobToEdit.id);
        if (jobToEdit.id) {
          // Update existing job
          const updatedJob: PostEmployeeJobModel = {
            jobId: jobToEdit.job,
            employeeId: updatedEmployee.id,
            entryDate: jobToEdit.entryDate,
            isManagement: jobToEdit.isManagement
          };
          console.log("updated job :", updatedJob);
          // Send updated job employeeToEdit to the server
          this._employeeJobService.updateJob(jobToEdit.id, updatedJob).subscribe((updatedJob: EmployeeJob) => {
            console.log('Job updated:', updatedJob);
            this._employeeService.getEmployeesList().subscribe();
          });
        } else {
          // Add new job
          const newJob: PostEmployeeJobModel = {
            jobId: jobToEdit.job,
            employeeId: updatedEmployee.id,
            entryDate: jobToEdit.entryDate,
            isManagement: jobToEdit.isManagement
          };
          // Send new job employeeToEdit to the server
          this._employeeJobService.addJob(newJob).subscribe((createdJob: EmployeeJob) => {
            console.log('New job added:', createdJob);
            this._employeeService.getEmployeesList().subscribe();
          });

        }
      });


    });

    this.router.navigate(['/all-details']);
  }

  addJobForm(): void {
    const jobForm = this.fb.group({
      id: [undefined],
      job: [null, Validators.required],
      entryDate: ['', Validators.required],
      isManagement: [0, Validators.required]
    });

    const empJobs = this.editEmployeeForm.get('empJobs') as FormArray;
    jobForm.get('job').valueChanges.subscribe((value) => {
      if (value) {
        this.selectedJobs.push(value);
      }
    });
    empJobs.push(jobForm);
  }

  removeJobForm(index: number): void {
    const empJobs = this.editEmployeeForm.get('empJobs') as FormArray;
    const jobForm = empJobs.at(index);

    // Remove the job ID from the selectedJobs array
    const jobId = jobForm.get('job').value;
    const jobIdIndex = this.selectedJobs.indexOf(jobId);
    if (jobIdIndex !== -1) {
      this.selectedJobs.splice(jobIdIndex, 1);
    }
    // Check if the job is an existing job (already saved on the server)
    const isExistingJob = jobForm.get('id').value !== undefined;

    // If it's an existing job, delete it from the server
    if (isExistingJob) {
      const jobId = jobForm.get('id').value;

      this._employeeJobService.deleteJob(jobId).subscribe(() => {
        console.log('Job deleted from server with ID:', jobId);
      });
    }

    // Remove the job form from the local form array and the UI
    empJobs.removeAt(index);
  }

  filterStartDate = (date: Date): boolean => {
    const startDate = this.editEmployeeForm.get('startDate').value;
    return startDate || date >= startDate;
  };
}



