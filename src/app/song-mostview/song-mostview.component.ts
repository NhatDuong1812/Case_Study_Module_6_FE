import { Component, OnInit } from '@angular/core';
import {Playlist} from '../model/playlist';
import {song} from '../model/song';
import {PlaylistService} from '../service/playlist/playlist.service';
import {SongService} from '../service/song/song.service';

@Component({
  selector: 'app-song-mostview',
  templateUrl: './song-mostview.component.html',
  styleUrls: ['./song-mostview.component.css']
})
export class SongMostviewComponent implements OnInit {

  showSongLike = true;
  showPlaylistLike = false;
  listPlaylistNew : Playlist[] = [];
  listSongMostView10 : song[] = [];
  constructor(private playlistService: PlaylistService, private songService: SongService) {
  }

  ngOnInit(): void {
    this.playlistService.latestPlaylist().subscribe( listPlaylistNew => {
      this.listPlaylistNew = listPlaylistNew;
    })
    this.songService.getList10SongInTopView().subscribe(async list10Song => {
      this.listSongMostView10 = list10Song;
    })

  }
  songLike(){
    this.showSongLike = true;
    this.showPlaylistLike = false;
  }
  playlistLike(){
    this.showPlaylistLike = true;
    this.showSongLike = false;
  }

}
