import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {
  orders:Order[]=[];
  constructor(private orderService:OrderService,private router:Router){
    this.orderService.getOrders().subscribe(data=>{
      this.orders=data
    })
  }
}
