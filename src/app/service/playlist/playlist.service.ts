import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Playlist} from '../../model/playlist';
import {song} from '../../model/song';
import {Track} from "ngx-audio-player";
import {LikeSong} from "../../model/like-song";
import {LikePlaylist} from "../../model/like-playlist";
// const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private API_URL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getAllPlayList(username: String): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.API_URL + `/playlists/user/${username}`);
  }
  createNewPlayList(playlist: Playlist, username: String): Observable<Playlist> {
    return this.http.post<Playlist>(this.API_URL + `/playlists/user/${username}`, playlist);
  }
  updatePlayList(username: String, id: number, playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(this.API_URL + `/playlists/user/${username}/playlist/${id}`, playlist);
  }
  getPlayListById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(this.API_URL + `/playlists/${id}`);
  }
  deletePlayListById(id: number, username: String): Observable<Playlist> {
    return this.http.delete<Playlist>(this.API_URL + `/playlists/user/${username}/playlist/${id}`);
  }
  latestPlaylist(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.API_URL + `/playlists/latestPlaylists`);
  }
  getTopView(): Observable<Playlist[]>{
    return this.http.get<Playlist[]>(this.API_URL + `/playlists/topView`);
  }
  addSongToPlaylist(idSong: number, idPlaylist: number): Observable<Playlist> {
    // @ts-ignore
    return this.http.post<Playlist>(this.API_URL + `/playlists/${idPlaylist}/songs/${idSong}`);
  }
  getPlaylistByUsername(username: String): Observable<Playlist[]>{
    return this.http.get<Playlist[]>(this.API_URL + `/playlists/user/${username}`);
  }
  getPlayListMostLike(): Observable<Playlist[]>{
    return this.http.get<Playlist[]>(this.API_URL + `/playlists/topLike`);
  }
  getPlaylistLikeNumber(): Observable<number[]>{
    return this.http.get<number[]>(this.API_URL + `/playlists/likeNumber`);
  }
  getTrackPlaylist(id: number): Observable<Track[]> {
    return this.http.get<Track[]>(this.API_URL + `/playlists/tracks/${id}`);
  }
  findAllByNameContains(keyword: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.API_URL + `/playlists/searchPlaylist/${keyword}`);
  }
  addLikePlaylist(likePlaylist: LikePlaylist){
    return this.http.post<LikePlaylist>(this.API_URL + `/playlists/addLike/${likePlaylist.playlist.id}/user/${likePlaylist.user.username}`, likePlaylist);
  }
  deleteLikePlaylist(likePlaylist: LikePlaylist){
    return this.http.delete<LikePlaylist>(this.API_URL + `/playlists/deleteLike/${likePlaylist.playlist.id}/user/${likePlaylist.user.username}`);
  }
  getLikeStatus(likePlaylist: LikePlaylist){
    return this.http.get<LikePlaylist>(this.API_URL + `/playlists/like/${likePlaylist.playlist.id}/user/${likePlaylist.user.username}`);
  }
  addViewPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(this.API_URL + `/playlists/addView/${playlist.id}`, playlist);
  }
  deleteSongOutPlaylist(idPlaylist : number, username : String, idSong : number): Observable<song[]>{
    return this.http.delete<song[]>(this.API_URL + `/song-playlist/${idPlaylist}/user/${username}/delete/${idSong}`)
  }
}
