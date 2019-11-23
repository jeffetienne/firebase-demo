import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Items } from '../models/items';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
  providers: [AngularFireAuth]
})
export class BsNavbarComponent implements OnInit {
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe((cart: ShoppingCart) => {
      this.shoppingCartItemCount = 0;
      for(let productId in cart.items){
        this.shoppingCartItemCount += cart.items[productId].quantity;
      }
    })
  }
  appUser: AppUser;
  shoppingCartItemCount: number;

  constructor(private auth: AuthService,
              private shoppingCartService: ShoppingCartService) { 
    
  }

  logout(){
    this.auth.logout();
  }
}
