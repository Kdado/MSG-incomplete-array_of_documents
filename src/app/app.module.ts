import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { StudentFilterPipe } from 'assets/pipes/StudentFilterPipe';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from 
    '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatButtonModule } from '@angular/material/button'; 
import {MatSelectModule} from '@angular/material/select';
import { StudentFormComponent } from './student-form/student-form.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentFilterPipeNew } from 'assets/pipes/StudentFilterPipeNew';
import { AddCasesComponent } from './add-cases/add-cases.component';
import { AddCasesFormComponent } from './add-cases-form/add-cases-form.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReturnCaseComponent } from './return-case/return-case.component';
import { ReturnCaseFormComponent } from './return-case-form/return-case-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentFilterPipe,
    StudentFilterPipeNew,
    StudentFormComponent,
    AddStudentComponent,
    StudentsListComponent,
    AddCasesComponent,
    AddCasesFormComponent,
    TransactionsComponent,
    ReturnCaseComponent,
    ReturnCaseFormComponent
    
  ],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    MatButtonModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
