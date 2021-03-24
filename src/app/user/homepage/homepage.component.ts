import {Component, OnInit, ViewChild} from '@angular/core';
import {Playlist} from '../../model/playlist';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {song} from '../../model/song';
import {SongService} from '../../service/song/song.service';
import { DataServiceService } from 'src/app/service/data/data-service.service';

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

  showUp = false;

  songId:number;

  getSongId(id:any){
    this.songId = id;
    console.log(this.songId);
    this.data.changeMessage(id);
    this.data.changeShowUp("true");
  }
  constructor( private playlistService: PlaylistService,
               private songService: SongService,
               private data: DataServiceService) {
  }


  ngOnInit(): void {
    this.data.currentMessage.subscribe(id => this.songId = +id);
    this.data.showUp.subscribe(id => this.showUp = (id === 'true'));
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
