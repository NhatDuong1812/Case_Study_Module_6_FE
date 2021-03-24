import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private messageSource = new BehaviorSubject('1');
  private showUpMessage = new BehaviorSubject("false");



  currentMessage = this.messageSource.asObservable();
  showUp = this.showUpMessage.asObservable();


  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeShowUp(message: string){
    this.showUpMessage.next(message);
  }
}
