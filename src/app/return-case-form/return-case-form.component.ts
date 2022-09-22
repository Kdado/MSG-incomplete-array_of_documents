import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'app/student.service';
import { student } from 'app/studentInterface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-return-case-form',
  templateUrl: './return-case-form.component.html',
  styleUrls: ['./return-case-form.component.css']
})
export class ReturnCaseFormComponent implements OnInit {

  student: BehaviorSubject<student> = new BehaviorSubject({});

  @Output()
  formSubmitted = new EventEmitter<student>();
 
  studentForm: FormGroup = new FormGroup({});

  constructor(private router: Router,
    private studentService: StudentService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder) { }

  inDate = (new Date()).toISOString().substring(0,10)
  transType = "Return"
  numOfCases
  maxCases = 3 //max # of cases returned??

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    //getting the number of outstanding cases in account
    this.studentService.getStudent(id !).subscribe((student) => {
      this.student.next(student);
      this.numOfCases = this.student.value.numberOfCasesInAccount
      console.log(this.numOfCases)
    });

      this.studentForm = this.fb.group({
        typeOfTransaction: '',
          chocoType: '', 
          quantity: '', 
          date: ''
      });
  }
  removeCaseToNumOfCases(student: student) {
    this.studentService.addCaseToNumOfCases(this.student.value._id || '', student)
            .subscribe({  
              next: () => {
                this.router.navigate(['/students']);
              },
              error: (error) => {
                alert('Failed to update student');
                console.error(error);
              }
            })
   }

  submitForm() { 
    let casesLeft = this.numOfCases
    if (casesLeft <= 0 ){
      alert("This account already has "+casesLeft+" cases left.")
    } else {
      let quantity = this.studentForm.value.quantity
      if (quantity <= 3){
        //adds object to transactions array
        this.formSubmitted.emit(this.studentForm.value);

        //takes quantity from object and adds it to numberOfCasesInAccount field
        this.removeCaseToNumOfCases(this.studentForm.value);
      }
    }
  }

}
