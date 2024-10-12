import { Injectable } from '@angular/core';
import { Dish } from './models/dish';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  baseUrl:string="http://localhost:3000"
  arrdishes:Dish[]=[]

  HttpHeaders={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getDishById(rest_id:number): Observable<Dish>{
    return this.httpClient.get<Dish>(this.baseUrl + '/dish/' + rest_id)
    .pipe(catchError(this.httpError));
  }

  httpError(error:HttpErrorResponse){
    let msg='';
    if(error.error instanceof ErrorEvent){
      msg=error.error.message;
    }
    else{
      msg=`Error Code:${error.status}\nMessage:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
