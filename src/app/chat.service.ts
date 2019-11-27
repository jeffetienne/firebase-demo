import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Chat } from './models/chats';
import { AppUser } from './models/app-user';
import { Message } from './models/messages';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  appUser: AppUser;
  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  private create(contenu: string, receiver: string){
    let result;
    this.auth.appUser$.subscribe(appUser => {
      result = this.db.list('/chats').push({
        content: contenu,
        sender: appUser.email,
        receiver: receiver,
        dateSent: new Date().getTime()
      });
    });
    return result
  }

  async getChat(contenu: string, receiver: string){
    let chatId = await this.getOrCreateChatId(contenu, receiver);
    return this.db.object('/chats/' + chatId)
  }

  private async getOrCreateChatId(contenu: string, receiver: string){
    let result;
    this.auth.appUser$.subscribe(appUser => {
      let chatId = localStorage.getItem('chatId_' + appUser.email + '_' + receiver);
      if (chatId) return chatId;
    result = this.create(contenu, receiver);
    localStorage.setItem('chatId_' + appUser.email + '_' + receiver, result.key);
    
    });
    
    return result.key;
    
  }

  private getItem(chatId: string, messageId: string){
    let item$ = this.db.object('/chats/' + chatId + '/messages/' + messageId);
    return item$;
  }

 async addToChat(message: Message){
  this.updateMessage(message);
  //this.create(contenu, receiver);
 } 

  private async updateMessage(message: Message){
    //let chatId = await this.getOrCreateChatId(message.contenu, message.receiver);

    this.auth.appUser$.subscribe(appUser => {
      let chatId = localStorage.getItem('chatId_' + appUser.email + '_' + message.receiver);
      console.log('chatId_' + appUser.email + '_' + message.receiver);
      console.log(chatId);
      if (!chatId) {
        console.log('1');
        let result;
        result = this.db.list('/chats').push({
          content: message.contenu,
          sender: appUser.email,
          receiver: message.receiver,
          dateSent: new Date().getTime()
        });
        console.log(result.key);
        localStorage.setItem('chatId_' + appUser.email + '_' + message.receiver, result.key);
        chatId = result.key;
        let item$ = this.getItem(chatId, message.key);
        if (item$) {
          item$.valueChanges().take(1).subscribe((message: Message) => {
            item$.set({ message: message });
          });
        }
      }
      //result = this.create(message.contenu, message.receiver);
      
    
      

      
    }); 
  }
}
