import { Component } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService, private auth: AuthService) {
    
    auth.user$.subscribe(user => {
      if (!user) return;

      userService.save(user);
    })
  }
}
