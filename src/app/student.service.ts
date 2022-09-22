import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { student } from './studentInterface';
 
@Injectable({
 providedIn: 'root'
})
export class StudentService {
 private url = 'http://localhost:5200';
 private students$: Subject<student[]> = new Subject();
 
 constructor(private httpClient: HttpClient) { }
 
 private refreshStudents() {
   this.httpClient.get<student[]>(`${this.url}/students`)
     .subscribe(students => {
       this.students$.next(students);
     });
 }
 
 getStudents(): Subject<student[]> {
   this.refreshStudents();
   return this.students$;
 }
 
 
 getStudent(id: string): Observable<student> {
   return this.httpClient.get<student>(`${this.url}/students/${id}`);
 }
 
 createStudent(student: student): Observable<string> {
   return this.httpClient.post(`${this.url}/students`, student, { responseType: 'text' });
 }
 
 updateStudent(id: string, student: student): Observable<string> {
   return this.httpClient.put(`${this.url}/students/${id}`, student, { responseType: 'text' });
 }
 addCase(id: string, student: student): Observable<string> {
  return this.httpClient.put(`${this.url}/students/${id}/add`, student, { responseType: 'text' });
}

  addCaseToNumOfCases(id: string, student: student): Observable<string> {
    return this.httpClient.put(`${this.url}/students/${id}/addCases`, student, { responseType: 'text' });
  }

 
 deleteStudent(id: string): Observable<string> {
   return this.httpClient.delete(`${this.url}/students/${id}`, { responseType: 'text' });
 }
}