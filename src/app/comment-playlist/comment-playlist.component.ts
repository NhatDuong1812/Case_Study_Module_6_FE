import { Component, OnInit } from '@angular/core';
import {userdetail} from '../model/userdetail';
import {ActivatedRoute, Router} from '@angular/router';
import {UserdetailService} from '../service/userdetail/userdetail.service';
import {AuthService} from '../service/auth/auth.service';
import {CommentPlaylist} from '../model/comment-playlist';
import {CommentPlaylistService} from '../service/comment-playlist/comment-playlist.service';

@Component({
  selector: 'app-comment-playlist',
  templateUrl: './comment-playlist.component.html',
  styleUrls: ['./comment-playlist.component.css']
})
export class CommentPlaylistComponent implements OnInit {

  idPlaylist : number = -1;
  listCommentPlaylist : CommentPlaylist[] = [];
  listCommentPlaylistFull : CommentPlaylist[] = [];
  currentUser : any;
  userDetail : userdetail = {};
  userDetailOldComment : userdetail | undefined;
  userDetails : userdetail[] = [];
  avatar : any;
  commentPlaylist : CommentPlaylist = {};
  numberCommentShow = 5;

  constructor(private route: Router, private userDetailService : UserdetailService,private commentPlaylistService : CommentPlaylistService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    activatedRoute.paramMap.subscribe( async paramMap => {
      // @ts-ignore
      this.idPlaylist = +paramMap.get('id');
      await this.getListCommentPlaylist();
    })
  }

  ngOnInit(): void {
    this.authService.currentUserSubject.subscribe(async value => {
      this.currentUser = value;
      await this.userDetailService.getUserDetailByUserName(this.currentUser.username).subscribe(value1 => {
        this.userDetail = value1;
        this.avatar = this.userDetail.avatar;
      })
    })
  }

  getListUserDetailByUsername(username: any){
    return this.userDetailService.getUserDetailByUserName(username).toPromise();
  }
  getListCommentPlaylist(){
    this.commentPlaylistService.getListCommentPlaylistByPlaylistId(this.idPlaylist).subscribe( async (list: CommentPlaylist[]) => {
      this.listCommentPlaylistFull = list;
      this.listCommentPlaylist = this.listCommentPlaylistFull.splice(0,this.numberCommentShow);
      for (let i = 0; i < this.numberCommentShow; i++) {

        // @ts-ignore
        this.userDetailOldComment = await this.getListUserDetailByUsername(this.listCommentPlaylist[i].user.username);
        this.userDetails.push(this.userDetailOldComment);
      }
    });
  }

  postComment(){
    this.commentPlaylistService.postCommentPlaylist(this.idPlaylist,this.currentUser.username,this.commentPlaylist).subscribe(async () =>{
      this.getListCommentPlaylist()
      this.commentPlaylist.content = ''
    })
  }
  showMore(){
    this.numberCommentShow += 5;
    this.getListCommentPlaylist();
  }

}
