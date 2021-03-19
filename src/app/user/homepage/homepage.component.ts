import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../model/playlist';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {song} from '../../model/song';
import {SongService} from '../../service/song/song.service';

declare var $: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  showSongLike = true;
  showPlaylistLike = false;
  listPlaylistNew : Playlist[] = [];
  listSongMostView10 : song[] = [];
  constructor(private playlistService: PlaylistService, private songService: SongService) {
  }

  ngOnInit(): void {
    this.playlistService.latestPlaylist().subscribe( async listPlaylistNew => {
      this.listPlaylistNew = listPlaylistNew;
       $(document).ready(() => {
        $('.slider-for').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
          slidesToShow: 5,
          slidesToScroll: 1,
          asNavFor: '.slider-for',
          dots: true,
          focusOnSelect: true
        });
      });
    })
    this.songService.getList10SongInTopView().subscribe( list10Song => {
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
