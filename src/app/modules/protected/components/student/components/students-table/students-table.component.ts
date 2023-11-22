import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StudentsTableDataSource, StudentsTableItem } from './students-table-datasource';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss']
})
export class StudentsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StudentsTableItem>;
  dataSource = new StudentsTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'teste1', 'teste2', 'teste3', 'teste4'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
