import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { AddCasesComponent } from './add-cases/add-cases.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ReturnCaseComponent } from './return-case/return-case.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/transactions/:id', component: TransactionsComponent },
  { path: 'students/new', component: AddStudentComponent },
  { path: 'students/edit/:id', component: AddCasesComponent },
  { path: 'students/returnCase/:id', component:  ReturnCaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
