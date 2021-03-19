import { Component, OnInit } from '@angular/core';
import {CommentSongService} from '../../service/comment-song/comment-song.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentSong} from '../../model/comment-song';
import {userdetail} from '../../model/userdetail';
import {AuthService} from '../../service/auth/auth.service';
import {UserdetailService} from '../../service/userdetail/userdetail.service';

@Component({
  selector: 'app-comment-song',
  templateUrl: './comment-song.component.html',
  styleUrls: ['./comment-song.component.css']
})
export class CommentSongComponent implements OnInit {

  idSong : number = -1;
  listCommentSong : CommentSong[] = [];
  listCommentSongFull : CommentSong[] = [];
  currentUser : any;
  userDetail : userdetail = {};
  userDetailOldComment : userdetail | undefined;
  userDetails : userdetail[] = [];
  avatar : any;
  commentSong : CommentSong = {};
  numberCommentShow = 5;

  constructor(private route: Router, private userDetailService : UserdetailService,private commentSongService : CommentSongService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    activatedRoute.paramMap.subscribe( async paramMap => {
      // @ts-ignore
      this.idSong = +paramMap.get('id');
      await this.getListCommentSong();
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
  getListCommentSong(){
    this.commentSongService.getListCommentSongBySongId(this.idSong).subscribe( async (list: CommentSong[]) => {
      this.listCommentSongFull = list;
      this.listCommentSong = this.listCommentSongFull.splice(0,this.numberCommentShow);
      for (let i = 0; i < this.numberCommentShow; i++) {

        // @ts-ignore
        this.userDetailOldComment = await this.getListUserDetailByUsername(this.listCommentSong[i].user.username);
        this.userDetails.push(this.userDetailOldComment);
      }
    });
  }

  postComment(){
    this.commentSongService.postCommentSong(this.idSong,this.currentUser.username,this.commentSong).subscribe(async () =>{
      this.getListCommentSong()
      this.commentSong.content = ''
    })
  }
  showMore(){
    this.numberCommentShow += 5;
    this.getListCommentSong();
  }
}
