import {Component, OnInit} from '@angular/core';
import {Student} from "./stutent";
import {StudentService} from "./student.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public students: Student[] = [];
  public editStudent: Student | null | undefined;
  public deleteStudent: Student | null | undefined;

  constructor(private studentService: StudentService) {
  }

  ngOnInit() {
    this.getStudents();
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

  public onOpenModal(student: Student | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }
    if (mode == 'edit') {
      this.editStudent = student;
      button.setAttribute('data-target', '#updateStudentModal');
    }
    if (mode == 'delete') {
      this.deleteStudent = student;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onAddStudent(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-student-form').click();
    this.studentService.addStudents(addForm.value).subscribe(
      (response: Student) => {
        //console.log(response);
        this.getStudents();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateStudent(student: Student): void {
    this.studentService.updateStudents(student).subscribe(
      (response: Student) => {
        //console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteStudent(studentId: number | undefined): void {
    this.studentService.deleteStudents(studentId).subscribe(
      (response: void) => {
        //console.log(response);
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchStudent(key: string): void {
    //console.log(key);
    const results: Student[] = [];
    for (const student of this.students) {
      if (student.name?.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || student.email?.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || student.phone?.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || student.specialization?.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(student);
      }
    }
    this.students = results;
    if(!key) {
      this.getStudents();
    }
  }
}


