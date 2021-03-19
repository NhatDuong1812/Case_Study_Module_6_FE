import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLogin = false;
  currentUser : any;

  constructor(private authService : AuthService) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if(this.currentUser){
        this.isUserLogin = true;
      }
    })
  }

  ngOnInit(): void {
  }

}
