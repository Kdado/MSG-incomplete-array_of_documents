import { Component, Input } from '@angular/core';
import { studentOld } from './oldStudentInterface';
import { student } from './studentInterface';
import studentData from '../assets/data/students.json'
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 

  constructor() { }

  ngOnInit(): void {
    
  }


  // OLD CODE ---- NOT NEEDED ANYMORE----------------------------------

  //array that stores all students
  studentList: studentOld[] = studentData;

  //the last name being searched for
  searchTerm: string;

  selectedStudent: studentOld={id: 0, firstName: "", lastName: "", parentEmail: "", phone: 0, casesInAccount: 0};

  displayAddCaseSection = false;

  displayHistory =false;

  disableAddCaseButton= false;

  showStudentsInfo = false

  maxCases = 3

  showMyContainer: boolean = false;

  inQuantity: number = 1

  inDate = (new Date()).toISOString().substring(0,10)
  
  inChocolateType: string = "Milk Chocolate"

  casesArray = new Array()

 
  //function that displays the information of the student selected
  selectStudent(id) {

    this.showStudentsInfo = true;
    this.resetDivs()

    for (let student of this.studentList) {
      if (student.id == id) {
        this.selectedStudent = student

        //if cases in student's account is less than max value (3), keep add case button enabled
        if (student.casesInAccount < this.maxCases) {
          this.disableAddCaseButton = false
        } else {
          this.disableAddCaseButton = true
        }
      }
    }
  }


  //add case(s) to student's account
  addCase(id) {
    for (let student of this.studentList) { 
      if (student.id == id) {
        if ((student.casesInAccount + Number(this.inQuantity)) <= 3) {
          student.casesInAccount += Number(this.inQuantity)
  
          var caseGiven = {studID: student.id, date: this.inDate, choc: this.inChocolateType, quan: this.inQuantity}
          this.casesArray.push(caseGiven)

          //hide section after submitting
          this.displayAddCaseSection = false;
        } 
        else {
          let casesLeft = this.maxCases - student.casesInAccount
          if (casesLeft == 1 || casesLeft == 2) {
            alert("A student's account can't have more than 3 cases. You can only add " + casesLeft + " more case(s).")
          }
        }
        
        if (student.casesInAccount == 3) {
          this.displayAddCaseSection = false;
          this.disableAddCaseButton = true
        }
      }
    }
    
  }

  resetDivs() {
    this.displayHistory = false;
    this.displayAddCaseSection = false;
  }


  showAddCaseSection() {
    this.displayAddCaseSection = true;
  }
 
  
  title = 'Milton_Springers_Gymnastic';


}
