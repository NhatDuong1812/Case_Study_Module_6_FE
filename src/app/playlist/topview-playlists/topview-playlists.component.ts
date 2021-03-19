import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {Playlist} from '../../model/playlist';
import {userdetail} from '../../model/userdetail';
import {UserdetailService} from '../../service/userdetail/userdetail.service';

@Component({
  selector: 'app-topview-playlists',
  templateUrl: './topview-playlists.component.html',
  styleUrls: ['./topview-playlists.component.css']
})
export class TopviewPlaylistsComponent implements OnInit {

  userdatas: userdetail[] = [];
  userdata: userdetail | undefined;
  playlistTopView: Playlist[] = [];
  constructor(private playlistService: PlaylistService, private userdetailService: UserdetailService) { }

  ngOnInit(): void {
    this.playlistService.getTopView().subscribe(async playlists => {
      this.playlistTopView = playlists;
      for (let i = 0; i < playlists.length; i++){
        // @ts-ignore
        this.userdata = await this.getListUserDetail(this.playlistTopView[i].user.username);
        this.userdatas.push(this.userdata);
      }
    });
  }

  getListUserDetail(username: any){
    return this.userdetailService.getUserDetailByUserName(username).toPromise();
  }


}
