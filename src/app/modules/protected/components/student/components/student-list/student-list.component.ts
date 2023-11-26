import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Student } from '../../model/student';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'birth_date', 'weight', 'height', 'training_goals', 'training_frequency', 'health_restrictions', 'actions'];
  dataSource = new MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public studentService: StudentService
  ) { }

  ngAfterViewInit() {
    this.studentService.getAll().subscribe((response: any)=>{
      // TODO: Create a StudentResponse interface
      this.dataSource.data = response.data;
    })

    this.dataSource.paginator = this.paginator;
  }

}
