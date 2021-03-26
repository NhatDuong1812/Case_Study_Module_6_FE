import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {userdetail} from '../../model/userdetail';
import {Observable} from 'rxjs';
import {User} from '../../model/user';
import {Customer} from '../../model/customer';
import {AuthService} from '../auth/auth.service';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserdetailService {
  currentUser : any;

  constructor(private authService : AuthService,private http: HttpClient) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if(this.currentUser){
      }
      /*this.currentUser.id*/
    })
  }

  // tslint:disable-next-line:no-shadowed-variable
  createNewUserDetail(userdetail: userdetail): Observable<userdetail>{
    return this.http.post<userdetail>(API_URL + `/register`, userdetail);
  }
  createNewUser(user: User): Observable<User>{
    return this.http.post<User>(API_URL + `/register`, user);
  }
  createNewCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(API_URL + `/register`, customer);
  }
  getUserDetailByUserName(username : String): Observable<userdetail>{
    return this.http.get<userdetail>(API_URL + `/profile/${username}`);
  }
  editUserDetail(username: string, customer: Customer): Observable<Customer>{
    return this.http.put<Customer>(API_URL + `/profile/${username}`,customer);
  }
  getAllUserDetail(): Observable<userdetail[]>{
    return this.http.get<userdetail[]>(API_URL + '/registerss');
  }
}
