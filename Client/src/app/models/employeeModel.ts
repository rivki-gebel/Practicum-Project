import { EmployeeJob } from "./employeeJobModel"


export class Employee {
    id:number
    firstName: string
    lastName:string
    identityNum:number
    startDate:Date
    birthDate:Date
    gender:number
    jobs: EmployeeJob[];
}