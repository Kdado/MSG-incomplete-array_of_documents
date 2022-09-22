import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'app/student.service';
import { student } from 'app/studentInterface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-cases-form',
  templateUrl: './add-cases-form.component.html',
  styleUrls: ['./add-cases-form.component.css']
})
export class AddCasesFormComponent implements OnInit {

  student: BehaviorSubject<student> = new BehaviorSubject({});
  
  @Output()
  formSubmitted = new EventEmitter<student>();
 
  studentForm: FormGroup = new FormGroup({});

  constructor(private router: Router,
    private studentService: StudentService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder) { }

  inDate = (new Date()).toISOString().substring(0,10)
  transType = "Add"
  numOfCases
  maxCases = 3


  ngOnInit() {

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


  addCaseToNumOfCases(student: student) {
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
    let quantity = this.studentForm.value.quantity


    if (this.numOfCases + Number(quantity) <= 3) {

      //adds object to transactions array
      this.formSubmitted.emit(this.studentForm.value);

      //takes quantity from object and adds it to numberOfCasesInAccount field
      this.addCaseToNumOfCases(this.studentForm.value);

    } else {
      
      let casesLeft = this.maxCases - this.numOfCases
      if (casesLeft == 1 || casesLeft == 2 ) {
        alert("A student's account can't have more than 3 cases. You can only add " + casesLeft + " more case(s).")
      }
    }

}
}
  

