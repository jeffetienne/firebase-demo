import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories', ref => ref.orderByChild('name')).snapshotChanges().map(snapshots => {
      return snapshots.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
