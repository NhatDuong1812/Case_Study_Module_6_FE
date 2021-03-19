import { Component, OnInit } from '@angular/core';
import {SongService} from '../service/song/song.service';
import {song} from '../model/song';

@Component({
  selector: 'app-song-most-like',
  templateUrl: './song-most-like.component.html',
  styleUrls: ['./song-most-like.component.css']
})
export class SongMostLikeComponent implements OnInit {
  listSongMostLike: song[] = [];
  listNumberOfLike: number[] = [];
  constructor(private songService: SongService) {
    songService.getSongLikeNumber().subscribe(listNumber => {
      this.listNumberOfLike = listNumber;
      console.log(this.listNumberOfLike.length)
    });
  }

  ngOnInit(): void {
    this.songService.getTopLikeSong().subscribe(listSongTopLike => {
      this.listSongMostLike = listSongTopLike;
    });
  }

}
