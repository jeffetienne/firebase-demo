import { Component, OnInit } from '@angular/core';
import { Items } from '../models/items';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  cart$;
  items: Items[];
  shoppingCartItemCount: number;
  productIds;
  totalPrice: number=0;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart()).valueChanges();
    this.cart$.subscribe((cart: ShoppingCart) => {
      this.shoppingCartItemCount = 0;
      if (!cart) return;
      this.productIds = Object.keys(cart.items);
      for(let productId in cart.items){
        this.totalPrice += cart.items[productId].quantity * cart.items[productId].price;
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }
}
