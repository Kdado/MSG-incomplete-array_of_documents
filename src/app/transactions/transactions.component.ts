import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'app/student.service';
import { student } from 'app/studentInterface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  student: BehaviorSubject<student> = new BehaviorSubject({});
  
  stud 
  sum: 0
  arr: any[] = []
  constructor(private router: Router,
    private route: ActivatedRoute, private studService: StudentService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.studService.getStudent(id !).subscribe((student) => {
      
      this.stud = student
      for (let i = 0; i <this.stud.transactions.length; i++) {

        //console.log(typeof this.stud.transactions[i].quantity)
        this.sum= this.sum + this.stud.transactions[i].quantity
        //console.log(this.sum)
        this.sum++
      }

    });

    

  }

}
