import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {CommentSong} from '../../model/comment-song';
const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentSongService {

  currentUser : any;
  constructor(private authService: AuthService,private http: HttpClient) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if(this.currentUser){
      }
      /*this.currentUser.id*/
    })
  }

  getListCommentSongBySongId(songId : number): Observable<CommentSong[]>{
    return this.http.get<CommentSong[]>(API_URL + `/commentSong/${songId}`)
  }
  postCommentSong(songId : number,username: string, commentSong : CommentSong):Observable<CommentSong>{
    return this.http.post<CommentSong>(API_URL + `/commentSong/${songId}/${username}`,commentSong)
  }
}
