import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/service/data/data-service.service';
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
  constructor(private songService: SongService,
              private data: DataServiceService) { }

  getSongId(id:any){
    this.songId = id;
    this.data.changeMessage(id);
    this.data.changeShowUp("true");
  }

  ngOnInit(): void {
    this.songService.getLatest().subscribe(listSongs => {
      this.listLatestSongs = listSongs;
    });
  }

}
