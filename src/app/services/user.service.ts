import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class UserService {
  users: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) { }

  getUserByUsername(username: string): FirebaseListObservable<any[]> {
    return this.database.list(`users`, {query: {orderByChild: 'username', equalTo: username}});
  }

  getUserByUID(uid:string): FirebaseListObservable<any[]>{
    return this.database.list(`users`, {query: {orderByChild: 'uid', equalTo: uid}});
  }

  createNewUser(newUser: User): void {
    this.database.list(`users`).push(newUser);
  }

  userExists(uid: string): Observable<boolean> {
    return this.getUserByUID(uid).map(data => !!data[0]);
   }

}