import { Injectable, EventEmitter } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  update = new EventEmitter<string>();
  public currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserToken {
    return this.currentUserSubject.value;
  }

  // tslint:disable-next-line:typedef
  login(username: string | undefined, password: string | undefined) {
    return this.http.post(API_URL + '/login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('password',JSON.stringify(password));
        this.currentUserSubject.next(user);
        this.update.emit('login');
        return user;
      }));
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('user');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
