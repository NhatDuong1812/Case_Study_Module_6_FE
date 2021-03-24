import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {singer} from '../../model/singer';
import {Playlist} from "../../model/playlist";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http : HttpClient) { }

  getAllSinger(): Observable<singer[]>{
    return this.http.get<singer[]>(API_URL + `/singer`);
  }
  findAllByNameContains(keyword: string): Observable<singer[]> {
    return this.http.get<Playlist[]>(API_URL + `/singer/searchSinger/${keyword}`);
  }
  createSinger(singer: singer) : Observable<singer>{
    return this.http.post<singer>(API_URL + `/singer`,singer);
  }
  findByID(id: number): Observable<singer>{
    return this.http.get<singer>(API_URL + `/singer/${id}`);
  }
}
