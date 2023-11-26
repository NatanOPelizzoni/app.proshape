import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { StudentService } from '../../service/student.service';
import { StudentRequest } from 'src/app/data/interfaces/student/student-request';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'birth_date', 'weight', 'height', 'training_goals', 'training_frequency', 'health_restrictions', 'actions'];
  dataSource = new MatTableDataSource<StudentRequest>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public studentService: StudentService
  ) { }

  ngAfterViewInit() {
    this.studentService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response.data;
    })

    this.dataSource.paginator = this.paginator;
  }

}
