import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  name: string='';
  email: string='';
  phone: string='';
  subject: string='';
  message: string='';
  location: string='';
  orderNumber: string='';
  // attachment: File|undefined=undefined;
  to_show:boolean=true;
  

  onSubmit(form: NgForm) {
    console.log(form);
  }
  constructor() { 
    console.log(this.name);
  if(this.name!='' && this.email!='' && this.phone!='' && this.subject!='' && this.message!='' && this.location!='' && this.orderNumber!=''){
    this.to_show=false;
    
  }
}
}
