import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface StudentsTableItem {
  id: number;
  name: string;
  teste1: string;
  teste2: string;
  teste3: string;
  teste4: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: StudentsTableItem[] = [
  {id: 1, name: 'Hydrogen', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 2, name: 'Helium', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 3, name: 'Lithium', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 4, name: 'Beryllium', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 5, name: 'Boron', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 6, name: 'Carbon', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 7, name: 'Nitrogen', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 8, name: 'Oxygen', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 9, name: 'Fluorine', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 10, name: 'Neon', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 11, name: 'Sodium', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 12, name: 'Magnesium', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 13, name: 'Aluminum', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 14, name: 'Silicon', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 15, name: 'Phosphorus', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 16, name: 'Sulfur', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 17, name: 'Chlorine', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 18, name: 'Argon', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 19, name: 'Potassium', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
  {id: 20, name: 'Calcium', teste1: 'teste1', teste2: 'teste2', teste3: 'teste3', teste4: 'teste4'},
];

/**
 * Data source for the StudentsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StudentsTableDataSource extends DataSource<StudentsTableItem> {
  data: StudentsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<StudentsTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: StudentsTableItem[]): StudentsTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: StudentsTableItem[]): StudentsTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'teste1': return compare(a.teste1, b.teste1, isAsc);
        case 'teste2': return compare(a.teste2, b.teste2, isAsc);
        case 'teste3': return compare(a.teste3, b.teste3, isAsc);
        case 'teste4': return compare(a.teste4, b.teste4, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
