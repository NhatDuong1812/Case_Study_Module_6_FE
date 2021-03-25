import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {singer} from '../../model/singer';


// const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  private API_URL = environment.apiUrl;
  constructor(private http : HttpClient) { }

  getAllSingerPage(page: number, size: number, sort : string): Observable<any>{
    return this.http.get(`${this.API_URL}/singer?page=${page}&${size}&${sort}`);
  }
  getAllSinger(): Observable<singer[]>{

    return this.http.get<singer[]>(this.API_URL + `/singer`);
  }
  findAllByNameContains(keyword: string): Observable<singer[]> {
    return this.http.get<singer[]>(this.API_URL + `/singer/searchSinger/${keyword}`);
  }
  createSinger(singer: singer) : Observable<singer>{
    return this.http.post<singer>(this.API_URL + `/singer`,singer);
  }
  findByID(id: number): Observable<singer>{
    return this.http.get<singer>(this.API_URL + `/singer/${id}`);
  }
  findByName(keyword: string): Observable<singer>{
    return this.http.get<singer>(this.API_URL+ `/singer/editSinger/${keyword}`);
  }
}
