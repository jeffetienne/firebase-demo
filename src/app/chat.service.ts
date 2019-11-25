import { Chat } from './models/chats';
import { AppUser } from './models/app-user';
import { Message } from './models/messages';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase) { }

  private create(){
    return this.db.list('/chats').push({
      dateCreated: new Date().getTime()
    });
  }

  async getChat(){
    let chatId = await this.getOrCreateChatId();
    return this.db.object('/chats/' + chatId)
  }

  private async getOrCreateChatId(): Promise<string>{
    let chatId = localStorage.getItem('chatId');
    
    if (chatId) return chatId;
    let result = await this.create();
    localStorage.setItem('chatId', result.key);
    return result.key;
  }

  private getItem(chatId: string, messageId: string){
    let item$ = this.db.object('/chats/' + chatId + '/messages/' + messageId);
    return item$;
  }

 async addToChat(message: Message){
  this.updateMessage(message);
 } 

  private async updateMessage(message: Message){
    let chatId = await this.getOrCreateChatId();
    let item$ = this.getItem(chatId, message.key);
    if(item$){
      item$.valueChanges().take(1).subscribe((message: Message) => {
        item$.set({ message: message});
      });
    }
    this.db.list('/chats').push({
      message: message,
      dateCreated: new Date().getTime()
    });
  }
}
