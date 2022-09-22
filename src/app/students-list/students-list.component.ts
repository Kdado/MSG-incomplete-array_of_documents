import { Component, OnInit } from '@angular/core';
import { StudentService } from 'app/student.service';
import { student } from 'app/studentInterface';
import { Observable } from 'rxjs';
import { StudentFilterPipeNew } from 'assets/pipes/StudentFilterPipeNew';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  searchTerm: string;

  disableAddCaseButton = false

  students$: Observable<student[]> = new Observable();

  constructor(private studentsService: StudentService) { }

  ngOnInit(): void {
    this.fetchStudents();

    
    //trying to disable "add case" button when number of cases is equal to 3 (not complete)
    this.students$.forEach(student => {

      for (let x of student) {
        console.log(x)
        if (x.numberOfCasesInAccount == 3) {
          //this.disableAddCaseButton = true
        } 
      }
      
     
    })
    
  }

  private fetchStudents(): void {
    this.students$ = this.studentsService.getStudents();

  }

}
