import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../service/playlist/playlist.service";
import {ActivatedRoute} from "@angular/router";
import {Track} from "ngx-audio-player";
import {Playlist} from "../../model/playlist";
import {LikePlaylist} from "../../model/like-playlist";
import {AuthService} from "../../service/auth/auth.service";
import { song } from 'src/app/model/song';
import { User } from 'saucelabs';

@Component({
  selector: 'app-play-playlist',
  templateUrl: './play-playlist.component.html',
  styleUrls: ['./play-playlist.component.css']
})
export class PlayPlaylistComponent implements OnInit {
  playlist: Playlist = {};
  user: User = {};
  idPlaylist: number | undefined;
  trackPlaylists: Track[] = [];
  topPlaylists: Playlist[] = [];
  typeButtonLikePlaylist: string = 'btn btn-outline-danger';
  titleLike: string = 'Like';
  currentUser: any = {};
  likePLayList: LikePlaylist = {
    user: this.currentUser,
    playlist: this.playlist
  }


  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
    this.authService.currentUserSubject.subscribe(value => {
      this.likePLayList.user = value;
      this.currentUser = value;
    });
    this.activatedRoute.paramMap.subscribe(paramMap => {
      // @ts-ignore
      this.idPlaylist = +paramMap.get('id');
      this.getTrackPlaylist(this.idPlaylist);
      this.getPlaylistById(this.idPlaylist);
      this.playlist.id = this.idPlaylist;
    })
    this.playlistService.getTopView().subscribe(value => {
      this.topPlaylists = value;
    })
  }

  ngOnInit(): void {
    this.checkStatusLikePlaylist(this.likePLayList);
  }

  getTrackPlaylist(idPlaylist: number){
    this.playlistService.getTrackPlaylist(idPlaylist).subscribe(value => {
      this.trackPlaylists = value;
    })
  }

  getPlaylistById(idPlaylist: number){
    this.playlistService.getPlayListById(idPlaylist).subscribe(value => {
      this.playlist = value;
      this.likePLayList.playlist = value;
      this.playlistService.addViewPlaylist(this.playlist).subscribe(value1 => {
        this.playlist = value1;
      })
    })
  }

  checkStatusLikePlaylist(likePLayList: LikePlaylist){
    this.playlistService.getLikeStatus(likePLayList).subscribe(value => {
      if (value == null){
        this.typeButtonLikePlaylist = 'btn btn-outline-danger';
        this.titleLike = 'Like';
      } else {
        this.typeButtonLikePlaylist = 'btn btn-danger';
        this.titleLike = 'Unlike';
      }
    })
  }

  changeStatusLike(likePlayList: LikePlaylist){
    this.playlistService.getLikeStatus(likePlayList).subscribe(value => {
      if (value == null){
        this.playlistService.addLikePlaylist(likePlayList).subscribe(value1 => {
          this.checkStatusLikePlaylist(likePlayList)
        });
      } else {
        this.playlistService.deleteLikePlaylist(likePlayList).subscribe(value1 => {
          this.checkStatusLikePlaylist(likePlayList);
        });
      }
    })
  }


}
