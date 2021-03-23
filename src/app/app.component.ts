import { Component, SimpleChanges, ViewChild } from '@angular/core';
import * as $ from 'jquery';
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

  ngOnChange(changes: SimpleChanges){
    console.log(this.homePage.songId);
    this.songId =  this.homePage.songId;
  }

  title = 'project6';

}
