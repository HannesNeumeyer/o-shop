import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AppUser } from './models/user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = afAuth.authState;
   }

  login(){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }
  
  get appUser$(): Observable<AppUser>{
    //start with user Obervable mit Google-Properties wie displayName
    return this.user$.
    switchMap(user => {
      //map and switch user Observable to appUser Observable wie in Firebase
      if (user) return this.userService.get(user.uid);

      return Observable.of(null);
    })
  }
}
