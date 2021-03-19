import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../model/playlist';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-playlist',
  templateUrl: './search-playlist.component.html',
  styleUrls: ['./search-playlist.component.css']
})
export class SearchPlaylistComponent implements OnInit {
  keyword: any;
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.keyword = paramMap.get('keyword');
      this.playlists = await this.getListPlayList(this.keyword);
    });
  }

  ngOnInit(): void {

  }

  // tslint:disable-next-line:typedef
  getListPlayList(keyword: string){
    return this.playlistService.findAllByNameContains(keyword).toPromise();
  }

}
