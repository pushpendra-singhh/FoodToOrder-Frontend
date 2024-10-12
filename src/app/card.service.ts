// import { Injectable } from '@angular/core';
// import { Card } from './models/card';
// import { Product } from './models/product';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Dish } from './models/dish';
// import { Observable, catchError, retry, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CardService {
//   // arrCards:Card[]=[
//   //   new Card(1,1,[1,2],[2,4],6),
//   //   new Card(2,2,[2],[3],3)
//   // ]
//   // card:Card=new Card(0,0,[],[],0);
//   r_id:number=0;
// baseUrl:string="http://localhost:3000";
// arrCards:Product[]=[];
// prod:Product=new Product(0,'','',0,0,0,0,0,0);
// httpHeader={
//   headers:new HttpHeaders({
//     'Content-Type':'application/json'
//   })
// }

//   constructor(private httpClient:HttpClient) { }
//   // getDish(): Observable<Dish[]>{
//   //   return this.httpClient.get<Dish>(this.baseUrl + '/dish')
//   //   .pipe(catchError(this.httpError));
//   // }
//   httpError(error:HttpErrorResponse){
//     let msg='';
//     if(error.error instanceof ErrorEvent){
//       msg=error.error.message;
//     }
//     else{
//       msg=`Error Code:${error.status}\nMessafe:${error.message}`;
//     }
//     console.log(msg);
//     return throwError(msg);
//   }

//   // getCardById(id:number){
//   //   for(let i=0;i<this.arrCards.length;i++){
//   //     if(this.arrCards[i].id==id){
//   //       this.card=this.arrCards[i];
//   //       return this.card
//   //     }
//   //   }
//   //   return this.card
//   // }

//   addCart(u:Card): Observable<Card>{
//     return this.httpClient.post<Card>(this.baseUrl+'/carts',JSON.stringify(u),this.httpHeader)
//     .pipe(
//       retry(1),
//       catchError(this.httpError)
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { Card } from './models/card';
import { Product } from './models/product';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Dish } from './models/dish';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  r_id: number = 0;
  baseUrl: string = "http://localhost:3000";
  arrCards: Product[] = [];
  prod: Product = new Product('', '', 0, 0, 0, 0, 0, 0);
  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  

  addCart(u: Card): Observable<Card> {
    console.log(u);
    // alert("adding to cart");
    // alert(`${this.baseUrl}/carts`)
    return this.httpClient.post<Card>(`${this.baseUrl}/carts`, JSON.stringify(u), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }
  getCart(): Observable<Card[]>{
    // alert("getting cart");
    return this.httpClient.get<Card[]>(this.baseUrl + '/carts')
    .pipe(catchError(this.httpError));
  }
  updateCart(u:Card): Observable<Card>{
    // alert("updating cart");
    return this.httpClient.put<Card>(this.baseUrl+'/carts/'+u.user_id,JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }
  getcartbyid(id:number): Observable<Card>{
    // alert("getting cart by id");
    return this.httpClient.get<Card>(this.baseUrl + '/carts/'+id)
    .pipe(catchError(this.httpError));
  }
  httpError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    }
    else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
