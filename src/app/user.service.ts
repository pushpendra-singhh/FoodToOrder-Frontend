import { Injectable } from '@angular/core';
import { User } from './models/user';
import { Address } from './models/address';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { User_Jwt } from './models/user_jwt';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // viewDetails(uid: number) {
  //   throw new Error('Method not implemented.');
  // }

  baseUrl:string="http://localhost:3000"
  arrUsers:User[]=[
  //   new User(1,"John","Jose","Hugh","abc123@gmail.com","xyz@123","12th July 1998","9876543210",new Address(100,"527","5th Main","Mvm","Blr","India","560003"),"user"),
  //   new User(2,"Praveen","Prakash","Choudhary","prakashpraveen929@gmail.com","praveen@123","15th April 2000","7050847592",new Address(101,"527","8th Main","Indira Nagar","Blr","India","560006"),"admin"),
  //   new User(3,"Rahul","Kumar","Singh","singhrahul123@gmail.com","rahul@123","15th April 2000","7050847592",new Address(102,"527","8th Main","Indira Nagar","Blr","India","560006"),"admin")
  ]

  httpHeader={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }


  constructor(private httpClient:HttpClient) { }

  // getUsers(){
  //   return this.arrUsers
  // }

  getUser(): Observable<User[]>{
  //  alert("getting users");
    return this.httpClient.get<User[]>(this.baseUrl + '/users')
    .pipe(catchError(this.httpError));
  }

  // getAddedUsers(){
  //   return this.arrAddedUsers
  // }

  // getUpdateUsers(){
  //   return this.arrUpdateUsers
  // }

  // addUser(u:User){
  //   this.arrUsers.push(u)
  //   console.log(this.arrUsers)
  // }
  addUser(u:User): Observable<User>{
    alert("adding user");
    return this.httpClient.post<User>(this.baseUrl+'/users',JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  // updateUser(u:User){
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(u.id==this.arrUsers[i].id){
  //       this.arrUsers[i]=u;
  //     }
  //   }

  //   this.arrUsers.forEach(u=>{
  //     console.log(u)
  //   })
  // }
  updateUser(u:User): Observable<User>{
    // alert("updating user");
    return this.httpClient.put<User>(this.baseUrl+'/users/'+u.id,JSON.stringify(u),this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  // deleteUser(uid:number){
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(uid==this.arrUsers[i].id){
  //       this.arrUsers.splice(i,1);
  //     }
  //   }
  //   this.arrUsers.forEach(u=>{
  //     console.log(u);
  //   })
  // }
  deleteUser(uid:number): Observable<void>{
    alert("deleting user by id");
    return this.httpClient.delete<void>(this.baseUrl+'/users/'+uid)
    .pipe(
      retry(1),
      catchError(this.httpError)
    );
  }


  
  // viewDetails(uid:number){
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(uid==this.arrUsers[i].id){
  //       console.log(this.arrUsers[i]);
  //     }
  //   }
  // }

  // getUserbyId(uid:number){
  //   let user=new User(0,'','','','','','','',new Address(0,'','','','','',''),'');
  //   for(var i=0;i<this.arrUsers.length;i++){
  //     if(uid==this.arrUsers[i].id){
  //       user=this.arrUsers[i];
  //       return user;
  //     }
  //   }
  //   return user;
  // }

  getUserById(uid:number): Observable<User>{
    // alert("getting user by id");
    return this.httpClient.get<User>(this.baseUrl + '/users/' + uid)
    .pipe(catchError(this.httpError));
  }

  getUserjwt(uid:number): Observable<JSON>{
    // alert("getting user by id");
    return this.httpClient.get<JSON>(this.baseUrl + '/users/jwt/' + uid)
    .pipe(catchError(this.httpError));
  }

  // verifyUserjwt(): Observable<>{
  //   // alert("getting user by id");
  //   return this.httpClient.get<Token>(this.baseUrl + '/users/jwt' + uid)
  //   .pipe(catchError(this.httpError));
  // }

  httpError(error:HttpErrorResponse){
    let msg='';
    if(error.error instanceof ErrorEvent){
      msg=error.error.message;
    }
    else{
      msg=`Error Code:${error.status}\nMessafe:${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
//// checking for authentication

baseeUrl:string="http://localhost:3500"
token:string="";
// registerUser(u:User): Observable<User>{
//   return this.httpClient.post<User>(this.baseeUrl+'/login',JSON.stringify(u),this.httpHeader)
//   .pipe(
//     retry(1),
//     catchError(this.httpError)
//   );
// }
// registerUser(u:User_Jwt): Observable<User_Jwt>{
//   return this.httpClient.post<User_Jwt>(this.baseeUrl+'/auth/register',JSON.stringify(u),this.httpHeader)
//   .pipe(
//     retry(1),
//     catchError(this.httpError)
//   );
// }
// loginUser(u:User_Jwt): string{
//   console.log('method called')
//   let jwt_result=this.httpClient.post<string>(this.baseeUrl+'/auth/login',JSON.stringify(u),this.httpHeader)
//   .pipe(
//     //retry(1),
//     catchError(this.httpError)
//   );
//   jwt_result.subscribe((data:string)=>{
//     this.token=data
//     console.log(this.token)
//     return this.token
//   })
//   return "empty"
// }
// loginUser(u:User): Observable<User>{
//   return this.httpClient.post<User>(this.baseeUrl+'/login',JSON.stringify(u),this.httpHeader)
//   .pipe(
//     retry(1),
//     catchError(this.httpError)
//   );
// }
}
