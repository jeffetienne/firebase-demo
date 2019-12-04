import { DataTableResource } from 'angular5-data-table';
import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Shipping } from '../models/shipping';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;
  orders: Shipping[]=[];
  orderCount;
  userId: string;
  tableResource: DataTableResource<Shipping>;

  constructor(private orderService: OrderService, private auth: AuthService) { 
    this.auth.user$.subscribe(user => {
      this.userId = user.uid
      console.log(this.userId);
      this.orders$ = orderService.getOrdersByUser(this.userId).snapshotChanges().map(snapshots => {
        return snapshots.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
      .subscribe((orders: Shipping[]) => {
        this.orders = orders;
        this.initializeTable(this.orders);
      });
    });
    
  }

  initializeTable(orders: Shipping[]){
    this.tableResource = new DataTableResource(orders);
      this.tableResource.query({ offset: 0 })
      .then(orders => this.orders = orders);
      this.tableResource.count()
      .then(count => this.orderCount = count);
  }

  reloadOrders(params){
    if (!this.tableResource) return;
    
    this.tableResource.query(params)
      .then(orders => this.orders = orders);
    this.initializeTable(params);
  }

  ngOnInit() {
  }

}
