import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {singer} from '../../model/singer';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http : HttpClient) { }

  getAllSinger(): Observable<singer[]>{
    return this.http.get<singer[]>(API_URL + `/singer`);
  }

}
