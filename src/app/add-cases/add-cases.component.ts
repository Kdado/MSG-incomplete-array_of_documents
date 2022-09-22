import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'app/student.service';
import { student } from 'app/studentInterface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-cases',
  templateUrl: './add-cases.component.html',
  styleUrls: ['./add-cases.component.css']
})
export class AddCasesComponent implements OnInit {

  student: BehaviorSubject<student> = new BehaviorSubject({});
 
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
  ) { }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }
    this.studentService.getStudent(id !).subscribe((student) => {
      this.student.next(student);
      if (student.numberOfCasesInAccount == 3) {
        alert("Student cannot have any more cases as they have reached the maximum amount of 3.")
        this.router.navigate(['/students']);
      }
    });
  }

  editStudent(student: student) {
    this.studentService.addCase(this.student.value._id || '', student)
      .subscribe({  
        
        next: () => {
          //this.studentService.addCase(this.student.value._id || '', student)
          this.router.navigate(['/students']);
        },
        error: (error) => {
          alert('Failed to update student');
          console.error(error);
        }
      })
  }
  

}
