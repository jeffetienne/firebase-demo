import { AppUser } from './app-user';
export class Message{
    key: string;
    sender: AppUser;
    receiver: AppUser;
    content: string;
    dateSent: number;

    constructor(){}
}