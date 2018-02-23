import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthAdminGuard implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$
    //map appUser Observable to Observable of Boolean based on isAdmin
    .map(appUser => appUser.isAdmin);
  }
}

