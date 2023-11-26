import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/data/constants/environment';
import { Student } from '../model/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  create(student: any): Observable<Student> {
    // TODO: Crate a StudentRequest interface
    return this.httpClient.post<Student>(`${this.apiUrl}/student`, JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.apiUrl}/student/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.apiUrl}/student`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, student: any): Observable<Student> {
    // TODO: Crate a StudentRequest interface
    return this.httpClient.put<Student>(`${this.apiUrl}/student/${id}`, JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number){
    return this.httpClient.delete<Student>(`${this.apiUrl}/student${id}`, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    // TODO: Create a interface for the error
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
