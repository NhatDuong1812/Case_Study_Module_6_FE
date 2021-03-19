import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';
import {UserdetailService} from '../../service/userdetail/userdetail.service';
import {userdetail} from '../../model/userdetail';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLogin = false;
  currentUser: any;
  userDetail: userdetail = {};
  imgSrc: any;
  keyword: string | null = '';

  constructor(private userDetailService: UserdetailService, private authService: AuthService, private route: Router) {

  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if (this.currentUser) {
        this.isUserLogin = true;
        this.userDetailService.getUserDetailByUserName(this.currentUser.username).subscribe(value1 => {
          this.userDetail = value1;
          this.imgSrc = this.userDetail.avatar;
        });
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  showProfile() {
    this.route.navigate(["/profile/" + this.currentUser.username]);
  }

  searchSongPlaylist() {
    this.route.navigate(['/search/' + this.keyword]);
  }
}
