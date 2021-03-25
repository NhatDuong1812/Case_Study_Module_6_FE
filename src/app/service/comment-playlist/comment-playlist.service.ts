import { Injectable } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentSong} from '../../model/comment-song';
import {environment} from '../../../environments/environment';
import {CommentPlaylist} from '../../model/comment-playlist';
// const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CommentPlaylistService {
  private API_URL = environment.apiUrl;
  currentUser: any;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if (this.currentUser) {
      }
      /*this.currentUser.id*/
    })
  }

  getListCommentPlaylistByPlaylistId(playlistID: number): Observable<CommentPlaylist[]> {
    return this.http.get<CommentPlaylist[]>(this.API_URL + `/commentPlaylist/${playlistID}`)
  }

  postCommentPlaylist(commentPlaylistID: number, username: string, commentPlaylist: CommentPlaylist): Observable<CommentPlaylist> {
    return this.http.post<CommentPlaylist>(this.API_URL + `/commentPlaylist/${commentPlaylistID}/${username}`, commentPlaylist)
  }
}
