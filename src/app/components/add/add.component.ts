import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from 'src/app/service/student.service';
import { Student } from '../../model/stutent';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  public onAddStudent(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById('add-student-form').click();
    this.studentService.addStudents(addForm.value).subscribe(
      (response: Student) => {
        //console.log(response);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

}
