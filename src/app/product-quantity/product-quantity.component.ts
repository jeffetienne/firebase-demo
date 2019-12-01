import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCartService } from '../shopping-cart.service';
import { Items } from '../models/items';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);
  }

  getQuantity(){
    if (!this.shoppingCart) return 0;
    
    let item: Items = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }

}
