import { Component, SimpleChanges, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { DataServiceService } from './service/data/data-service.service';
import { NewSongsComponent } from './songpage/new-songs/new-songs.component';
import { HomepageComponent } from './user/homepage/homepage.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(NewSongsComponent) newSong;
  @ViewChild(HomepageComponent) homePage;

  songId;

  constructor(private data: DataServiceService){}

  ngOnInit(){
    this.data.currentMessage.subscribe(id => this.songId = +id);
  }

}
