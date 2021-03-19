import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../model/playlist';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-playlist',
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.css']
})
export class ListPlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  currentUser: any;

  constructor(private playlistService: PlaylistService,
              private authService: AuthService,
              private route: Router) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
    this.getAllPlayList();
  }

  createPlayList() {
    this.route.navigate(['/create-playlist/' + this.currentUser.username]);
  }

  getAllPlayList(){
    this.playlistService.getAllPlayList(this.currentUser.username).subscribe(result => {
      this.playlists = result;
    }, error => console.log(error));
  }

  deletePlayList(id: number){
    if (confirm("Bạn chắc chắn xoá không ?")){
      this.playlistService.deletePlayListById(id, this.currentUser.username).subscribe( async playlist => {
        await this.route.navigate(['/create-playlist/' + this.currentUser.username]);
        await this.route.navigate(['/list-playlist/' + this.currentUser.username]);
      })
    }
  }
}
