import { AppUser } from './app-user';
export interface Message{
    key: string;
    sender: AppUser;
    receiver: AppUser;
    content: string;
    dateSent: number;
}