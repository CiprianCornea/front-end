import { Student } from 'src/app/model/stutent';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiServerUrl}/students`);
  }

  public addStudents(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiServerUrl}/students`, student);
  }

  public updateStudents(studentId: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiServerUrl}/students/${studentId}`, student);
  }

  public deleteStudents(studentId: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/students/${studentId}`);
  }

  public getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiServerUrl}/students/${studentId}`);
  }

}
