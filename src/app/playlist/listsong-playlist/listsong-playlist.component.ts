import { Component, OnInit } from '@angular/core';
import {song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import {AuthService} from '../../service/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistService} from '../../service/playlist/playlist.service';

@Component({
  selector: 'app-listsong-playlist',
  templateUrl: './listsong-playlist.component.html',
  styleUrls: ['./listsong-playlist.component.css']
})
export class ListsongPlaylistComponent implements OnInit {

  listSong : song[] = [];
  currentUser : any;
  idPlaylist = -1;
  constructor(private playlistService: PlaylistService, private songService : SongService, private authService : AuthService, private route : Router,private activatedRoute: ActivatedRoute) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( paramMap => {
      // @ts-ignore
      this.idPlaylist = +paramMap.get('id');
      this.songService.getSongsByPlaylistId(this.currentUser.username, this.idPlaylist).subscribe( list => {
        this.listSong = list;
      });
    })
  }
  deleteSong(id : number){
    if (confirm("Bạn chắc chắn xoá bài hát khỏi playlist không ?")){
      this.playlistService.deleteSongOutPlaylist(this.idPlaylist,this.currentUser.username, id).subscribe( songs => {
        this.listSong = songs;
      })
    }
  }
  listenSongs(){
    this.route.navigate(['playlists/display/' + this.idPlaylist])
  }

}
