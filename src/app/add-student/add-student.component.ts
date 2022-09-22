import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { student } from '../studentInterface';
import { StudentService } from 'app/student.service';
 
@Component({
 selector: 'app-add-student',
 templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
 constructor(
   private router: Router,
   private employeeService: StudentService
 ) { }
 
 addStudent(student: student) {
  console.log(student.firstName)
   this.employeeService.createStudent(student)
     .subscribe({
       next: () => {
         this.router.navigate(['/students']);
       },
       error: (error) => {
         alert("Failed to create student");
         console.error(error);
       }
     });
 }
}