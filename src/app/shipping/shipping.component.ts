import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { OrderService } from './../order.service';
import { Shipping } from './../models/shipping';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  shipping={};
  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  async save(){
    let id = this.route.snapshot.paramMap.get('id');
    let cart = await this.shoppingCartService.getCart();
    cart.valueChanges().subscribe((c: ShoppingCart) => {
      this.orderService.create(this.shipping, c);
      this.shoppingCartService.remove();
    });
        
    this.router.navigate(['/']);
    
  }

}
