import { Shipping } from './models/shipping';
import { ShoppingCart } from './models/shopping-cart';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private db: AngularFireDatabase) { }

  getOrder(id: string) {
    return this.db.object('/orders/' + id);
  }

  create(shipping, shoppingCart){
    this.db.list('/orders').push({
      shoppingCart: shoppingCart,
      name: shipping.name,
      address: shipping.address,
      //line2: shipping.line2,
      city: shipping.city,
      dateCreated: new Date().getTime()
    });
  }
}
