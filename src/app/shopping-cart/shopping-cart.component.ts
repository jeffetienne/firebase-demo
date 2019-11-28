import { Product } from './../models/products';
import { Items } from './../models/items';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  items: Items[];
  shoppingCartItemCount: number;
  productIds;
  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart()).valueChanges();
    this.cart$.subscribe((cart: ShoppingCart) => {
      this.shoppingCartItemCount = 0;
      if (!cart) return;
      this.productIds = Object.keys(cart.items);
      for(let productId in cart.items){
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    });
  }

}
