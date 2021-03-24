import { Component, OnInit } from '@angular/core';
import {singer} from "../../model/singer";
import {SingerService} from "../../service/singer/singer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {AuthService} from "../../service/auth/auth.service";


@Component({
  selector: 'app-edit-singer',
  templateUrl: './edit-singer.component.html',
  styleUrls: ['./edit-singer.component.css']
})
export class EditSingerComponent implements OnInit {
  singer: singer = {};
  id: number = -1;
  currentUser: any;
  selectedImage: any = null;
  username: any;
  userDetail: any;

  constructor(private singerService: SingerService,
              private activatedRouter: ActivatedRoute,
              private storage: AngularFireStorage,
              private authService: AuthService,
              private router: Router) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe( async paramMap =>{
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.singerService.findByID(this.id).subscribe(value => {
        this.singer = value;
        }
      )
    })
  }

}
