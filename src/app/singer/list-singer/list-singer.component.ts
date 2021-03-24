import { Component, OnInit } from '@angular/core';
import {singer} from "../../model/singer";
import {SingerService} from "../../service/singer/singer.service";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-singer',
  templateUrl: './list-singer.component.html',
  styleUrls: ['./list-singer.component.css']
})
export class ListSingerComponent implements OnInit {
  listSinger: singer[] = [];
  currentUser: any;
  constructor(private singerService: SingerService,
              private authService: AuthService,
              private route: Router) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
    this.singerService.getAllSinger().subscribe(list =>{
      this.listSinger = list;
    })
  }
  addSinger(){
    this.route.navigate(['/create-singer/'+ this.currentUser.username])
  }
}
