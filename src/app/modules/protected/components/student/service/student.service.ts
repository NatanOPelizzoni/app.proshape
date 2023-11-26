import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/data/constants/environment';
import { StudentResponse } from 'src/app/data/interfaces/student/student-response';
import { StudentRequest } from 'src/app/data/interfaces/student/student-request';


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

  create(student: StudentRequest): Observable<StudentResponse> {
    return this.httpClient.post<StudentResponse>(`${this.apiUrl}/student`, JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getById(id: number): Observable<StudentResponse> {
    return this.httpClient.get<StudentResponse>(`${this.apiUrl}/student/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<StudentResponse[]> {
    return this.httpClient.get<StudentResponse[]>(`${this.apiUrl}/student`)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, student: StudentRequest): Observable<StudentResponse> {
    return this.httpClient.put<StudentResponse>(`${this.apiUrl}/student/${id}`, JSON.stringify(student), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number){
    return this.httpClient.delete<StudentResponse>(`${this.apiUrl}/student${id}`, this.httpOptions)
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
