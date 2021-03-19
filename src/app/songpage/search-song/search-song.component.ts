import {Component, OnInit} from '@angular/core';
import {SongService} from "../../service/song/song.service";
import {ActivatedRoute} from "@angular/router";
import {song} from "../../model/song";
import {Playlist} from '../../model/playlist';
import {PlaylistService} from '../../service/playlist/playlist.service';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.css']
})
export class SearchSongComponent implements OnInit {
  keyword: any;
  songs: song[] = [];
  playlists: Playlist[] = [];

  constructor(private songService: SongService,
              private activatedRoute: ActivatedRoute,
              private playlistService: PlaylistService) {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.keyword = paramMap.get('keyword');
      this.getListPlayList(this.keyword);
      this.getListSong(this.keyword);
    });
  }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  getListSong(keyword: string) {
    this.songService.findAllByNameContains(keyword).subscribe(value => {
      this.songs = value;
    });
  }
  // tslint:disable-next-line:typedef
  getListPlayList(keyword: string){
    return this.playlistService.findAllByNameContains(keyword).subscribe(value1 => {
      this.playlists = value1;
    });
  }

}
