import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  //
  isCheck =false;
  isCheckStatus(){
    this.isCheck = !this.isCheck;
  }
  isCheckType(typeLike : string){
    switch (typeLike){
      case 'song':
        break;
      case 'playlist':
        break;
      default:
        break;
    }
  }
}
