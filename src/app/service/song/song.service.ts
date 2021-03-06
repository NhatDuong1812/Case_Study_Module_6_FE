import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {song} from '../../model/song';
import {AuthService} from '../auth/auth.service';
import {LikeSong} from "../../model/like-song";
// const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class SongService {
  private API_URL = environment.apiUrl;
  currentUser : any;
  constructor(private authService : AuthService,private http: HttpClient) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if(this.currentUser){
      }
      /*this.currentUser.id*/
    })
  }
  getSongById(id: number): Observable<song> {
    return this.http.get<song>(this.API_URL + `/songs/${id}`);
  }
  createSong(song : song, username : String): Observable<song>{
    console.log(username)
    return this.http.post<song>(this.API_URL + `/createsong/${username}`, song);
  }
  get10SongInTopViews(): Observable<song[]> {
    return this.http.get<song[]>(this.API_URL + `/top10views`);
  }
  findAllByNameContains(keyword: string): Observable<song[]> {
    return this.http.get<song[]>(this.API_URL + `/search/${keyword}`);
  }
  getAllSong(username : String): Observable<song[]>{
    return this.http.get<song[]>(this.API_URL + `/listsong/${username}`)
  }
  editSong(username : String, id : number, song : song): Observable<song>{
    return this.http.put<song>(this.API_URL + `/editsong/${username}/${id}`,song);
  }
  getLatest(): Observable<song[]>{
    return this.http.get<song[]>(this.API_URL + `/latestSongs`);
  }
  deleteSong(id : number): Observable<song>{
    return this.http.delete<song>(this.API_URL + `/listsong/${id}`);
  }
  getList10SongInTopView(): Observable<song[]>{
    return this.http.get<song[]>(this.API_URL + `/top10views`);
  }
  addView(song: song): Observable<song>{
    return this.http.put<song>(this.API_URL+`/songs/addView/${song.id}`, song);
  }
  addLikeSong(likeSong: LikeSong){
    return this.http.post<LikeSong>(this.API_URL + `/songs/addLike/${likeSong.song.id}/user/${likeSong.user.username}`, likeSong);
  }
  deleteLikeSong(likeSong: LikeSong){
    return this.http.delete<LikeSong>(this.API_URL + `/songs/deleteLike/${likeSong.song.id}/user/${likeSong.user.username}`);
  }
  // tslint:disable-next-line:typedef
  getLikeStatus (likeSong: LikeSong){
    return this.http.get<LikeSong>(this.API_URL + `/songs/like/${likeSong.song.id}/user/${likeSong.user.username}`);
  }
  getSongLikeNumber(): Observable<number[]>{
    return this.http.get<number[]>(this.API_URL + `/songs/likeNumberOfSong`);
  }
  getTopLikeSong(): Observable<song[]>{
    return this.http.get<song[]>(this.API_URL + `/songs/topLikeSong`);
  }
  getSongsByPlaylistId(username : string,id : number): Observable<song[]>{
    return this.http.get<song[]>(this.API_URL + `/song-playlist/${id}/user/${username}`)
  }
}

