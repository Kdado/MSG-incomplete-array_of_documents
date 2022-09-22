import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { student } from 'app/studentInterface';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  @Input()
  initialState: BehaviorSubject<student> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<student>();
 
  @Output()
  formSubmitted = new EventEmitter<student>();
 
  studentForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get firstName() { return this.studentForm.get('firstName')!; }
  get lastName() { return this.studentForm.get('lastName')!; }
  get phone() { return this.studentForm.get('phone')!; }
  get parentEmail() { return this.studentForm.get('parentEmail')!; }
  get casesInAccount() { return this.studentForm.get('casesInAccount')!; }
  get transactions() { return this.studentForm.get('transactions')!; }

  numberOfCasesInAccount = 0
  ngOnInit() {
    this.initialState.subscribe(student => {
      this.studentForm = this.fb.group({
        firstName: [ student.firstName, [Validators.required] ],
        lastName: [ student.lastName, [Validators.required] ],
        phone: [ student.phone, [ Validators.required ] ],
        parentEmail: [ student.parentEmail, [Validators.required] ],
        numberOfCasesInAccount: 0
      });
    });

    this.studentForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.studentForm.value);
  }

}
