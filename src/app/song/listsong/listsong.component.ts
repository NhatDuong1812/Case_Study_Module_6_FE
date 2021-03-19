import { Component, OnInit } from '@angular/core';
import {song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import {AuthService} from '../../service/auth/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-listsong',
  templateUrl: './listsong.component.html',
  styleUrls: ['./listsong.component.css']
})
export class ListsongComponent implements OnInit {
  listSong : song[] = [];
  currentUser : any;
  constructor(private songService : SongService, private authService : AuthService, private route : Router) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
     this.songService.getAllSong(this.currentUser.username).subscribe( list => {
       this.listSong = list;
     });
  }
  addSong(){
    this.route.navigate(['/createsong/' + this.currentUser.username])
  }
  deleteSong(id : number){
    if (confirm("Bạn chắc chắn xoá không ?")){
      this.songService.deleteSong(id,this.currentUser.username).subscribe( async song => {
        await this.route.navigate(['/createsong/' + this.currentUser.username])
        await this.route.navigate(['/listsong/' + this.currentUser.username])
      })
    }
  }

}
