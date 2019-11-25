import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Message } from './../models/messages';
import { ChatService } from './../chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: Message;
  appUser: AppUser;
  receiver: AppUser;
  constructor(private chatService: ChatService, private auth: AuthService ) { }

  private send(val: string){
    
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.receiver = {email: 'jeetic9@gmail.com', isAdmin: false, name: 'Jeff Etienne'};
    

    this.message = {key: '1', content: val, dateSent: new Date().getDate(), sender: this.appUser, receiver: this.receiver};
    console.log(this.auth.appUser$);
    
    this.chatService.addToChat(this.message).then(result => console.log(result));
  }

  ngOnInit() {
    
  }

}
