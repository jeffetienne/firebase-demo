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
  email: string;
  contenu: string;

  constructor(private chatService: ChatService, private auth: AuthService) { }

  private send(){
    
    this.message = new Message();
    this.message.contenu = this.contenu;
    this.message.receiver = this.email;
    
    //this.receiver = {email: 'jeetic9@gmail.com', isAdmin: false, name: 'Jeff Etienne'};
    

    //this.message = {key: '1', sender: this.appUser, receiver: this.receiver, content: val, dateSent: new Date().getDate()};
    //console.log(this.auth.appUser$);
    
    this.chatService.addToChat(this.message);
  }

  ngOnInit() {
    
  }

}
