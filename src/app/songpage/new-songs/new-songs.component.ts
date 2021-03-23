import { Component, OnInit } from '@angular/core';
import {song} from '../../model/song';
import {SongService} from '../../service/song/song.service';

@Component({
  selector: 'app-new-songs',
  templateUrl: './new-songs.component.html',
  styleUrls: ['./new-songs.component.css']
})
export class NewSongsComponent implements OnInit {

  songId:any;

  listLatestSongs: song[] = [];
  constructor(private songService: SongService) { }

  getSongId(id:Number){
    this.songId = id;
  }

  ngOnInit(): void {
    this.songService.getLatest().subscribe(listSongs => {
      this.listLatestSongs = listSongs;
    });
  }

}
