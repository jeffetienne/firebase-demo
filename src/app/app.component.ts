import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$;
  constructor(private db: AngularFireDatabase, private auth: AuthService, router: Router, userService: UserService){
    this.courses$ =  db.list('/courses')
    .valueChanges(); 
    auth.user$.subscribe(user => {
      if (user){
        userService.save(user);
        
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl){
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });    
  }

  add(course: HTMLInputElement, price: HTMLInputElement, author: HTMLInputElement){
    //this.courses$ = this.db.list('/courses').valueChanges();
    //this.courses$.push(course.value);
    this.db.database.ref('/courses').push({
      name: course.value,
      price: price.value,
      author: author.value
    });
    course.value = '';
    price.value = '';
    author.value = '';
  }

  update(course){
    this.db.object("/courses/" + course)
    .set(course + ' UPDATED');
  }
}
