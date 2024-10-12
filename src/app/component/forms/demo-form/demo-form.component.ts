import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/card.service';
import { Card } from 'src/app/models/card';
import { User } from 'src/app/models/user';
import { User_Jwt } from 'src/app/models/user_jwt';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css']
})
export class DemoFormComponent {
  emailAddress:string
  pwd:string
  // constructor(){
  //   this.emailAddress=""
  //   this.pwd=""
  // }
  username:string='';
  password:string='';
  msg:string='';
  users:User[]=[];
  card:Card=new Card(0,0,[],0);
  card_id:number=0;
  user_id:number=0;
token:string="";
 
  // base_url:string="http://localhost:3000";
  
  constructor(private userService:UserService,private router:Router, private cardService:CardService,private toastr: ToastrService){
    this.card_id=localStorage.getItem("id")?parseInt(localStorage.getItem("id")!):0;
    this.emailAddress=""
    this.pwd=""
    //this.users=this.userService.getUsers()
    this.userService.getUser().subscribe(data=>{
      this.users=data
      console.log(this.users);
    })
  
  }
  

  onSubmit(value: any): void{
    let flag=false;
    for(let i=0;i<this.users.length;i++){
      if(value.emailAddress==this.users[i].email && value.pwd==this.users[i].password){
        
        localStorage.setItem("role",this.users[i].role);
        console.log(this.users[i].role);
        localStorage.setItem("id",(i+1).toString());
        this.user_id=localStorage.getItem("id")?parseInt(localStorage.getItem("id")!):0;
        // alert(this.user_id);
        this.userService.getUserjwt(this.user_id).subscribe(data=>{
          console.log(data);
          localStorage.setItem("token",String(data));
         alert(localStorage.getItem("token"));
        });
        alert("Login Successfully "+this.users[i].role);
        // this.toastr.success('<img src="assets/images/welcome.gif">', 'Welcome back!', {
        //   timeOut: 3000,
        //   progressBar: true,
        //   progressAnimation: 'increasing',
        //   enableHtml: true
        // });
        // alert("Welcome "+this.users[i].role+"-"+this.users[i].first_name);
        // alert(`${this.base_url}/carts`);
        
        // this.cardService.addCart(this.card_id).subscribe (()=>{
        //   console.log("added");
        // });
        flag=true;
        break;
       
        }
    
      }
     
      // else{
      //   localStorage.setItem("role","user")
      // }
    
    if(flag==false){
      alert("Wrong Email id or password");
    }
   
  };
}


  //for jwt version

//  registerUser_Jwt(username: string, password: string) {
//   this.username = username;
//   this.password = password;
//   console.log(username);
//   console.log(password);
//   this.userService.registerUser(new User_Jwt(username,password)).subscribe(data =>{
//     let u=new User_Jwt(username,password);
//     this.userService.registerUser(u).subscribe(data=>{
//       console.log(data);
//     }
//     );
//   }) };

// loginUser_Jwt(username: string, password: string) {
//   this.username = username;
//   this.password = password;
//   console.log(username);
//   console.log(password);
//   this.userService.loginUser(new User_Jwt(username,password)) ;
  
// }
