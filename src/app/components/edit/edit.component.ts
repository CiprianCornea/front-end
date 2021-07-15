import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StudentService } from 'src/app/service/student.service';
import { Student } from '../../model/stutent';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public editStudent!: Student;
  public students: Student[] = [];
  private routeSub: Subscription = new Subscription;
  private idForUpdate!: number;
  
  constructor(private studentService: StudentService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

      this.routeSub = this.route.params.subscribe(params => {
        console.log(params) // log the entire params object
        console.log(params['id']);
        this.idForUpdate = params['id'];
      });
      this.getStudentById();
  }

  public onUpdateStudent(student: Student): void {
    student.id = this.idForUpdate;
    this.studentService.updateStudents(this.idForUpdate, student).subscribe(
      (response: Student) => {
        console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getStudents(): void {
    this.studentService.getStudents().subscribe(
      (response: Student[]) => {
        this.students = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getStudentById(): void {
    this.studentService.getStudentById(this.idForUpdate).subscribe(
      (response: Student) => {
        this.editStudent = response;
        console.log(this.editStudent);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
