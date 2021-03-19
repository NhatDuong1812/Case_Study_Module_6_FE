import { Component, OnInit } from '@angular/core';
import {song} from '../../model/song';
import {SongService} from '../../service/song/song.service';

@Component({
  selector: 'app-new-songs',
  templateUrl: './new-songs.component.html',
  styleUrls: ['./new-songs.component.css']
})
export class NewSongsComponent implements OnInit {
listLatestSongs: song[] = [];
  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.songService.getLatest().subscribe(listSongs => {
      this.listLatestSongs = listSongs;
    });
  }

}
