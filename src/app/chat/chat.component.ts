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
  contenu: string;
  constructor(private chatService: ChatService, private auth: AuthService ) { }

  private send(){
    
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.receiver = new AppUser();
    this.receiver.email = 'jeetic9@gmail.com';
    this.receiver.name = 'Jeff Etienne';
    this.receiver.isAdmin = false;

    this.message = new Message();
    this.message.content=this.contenu;
    this.message.sender = this.appUser;
    this.message.receiver = this.receiver;
    this.message.dateSent = new Date().getDate();
    //this.receiver = {email: 'jeetic9@gmail.com', isAdmin: false, name: 'Jeff Etienne'};
    

    //this.message = {key: '1', sender: this.appUser, receiver: this.receiver, content: val, dateSent: new Date().getDate()};
    //console.log(this.auth.appUser$);
    
    this.chatService.addToChat(this.message);
  }

  ngOnInit() {
    
  }

}
