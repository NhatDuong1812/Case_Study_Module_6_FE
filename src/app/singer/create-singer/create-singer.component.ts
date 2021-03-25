import { Component, OnInit } from '@angular/core';
import {singer} from "../../model/singer";
import {SongService} from "../../service/song/song.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {SingerService} from "../../service/singer/singer.service";

@Component({
  selector: 'app-create-singer',
  templateUrl: './create-singer.component.html',
  styleUrls: ['./create-singer.component.css']
})
export class CreateSingerComponent implements OnInit {

  singer: singer = {};
  singerList: singer[] = [];
  selectedImage: any = null;
  imgSrc: String = '';
  currentUser: any = null;
  username: any;
  createSuccess = false;

  constructor( private singerService: SingerService,
               private activatedRoute: ActivatedRoute,
               private authService: AuthService,
               private router:Router,
               private storage: AngularFireStorage)
   {
     this.authService.currentUserSubject.subscribe(value => {
       this.currentUser =value;
     })
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paraMap =>{
      this.username = paraMap.get('username');
      console.log(this.username);
    })
  }

  // tslint:disable-next-line:typedef
  createSinger(){
    return this.singerService.createSinger(this.singer).toPromise();
  }

  // tslint:disable-next-line:typedef
  submit(){
    const filePath = `${this.singer.name}/${this.selectedImage.name.split('.').
                      slice(0, -1).join('.')}_${new Date().getTime()}`;
  const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
    finalize(() => {
        fileRef.getDownloadURL().subscribe( async url =>{
          this.singer.avatar = url;
          await this.createSinger();
          this.createSuccess =true;
          this.switchEditSinger();
        });
      })
    ).subscribe();



  }
  showPreview(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }else {
      this.selectedImage = null;
    }
  }

  switchEditSinger(): void{
      this.router.navigate(["/edit-singer/"+this.currentUser.username,this.singer.name]);
  }
  cancel(){
    this.router.navigate(["/profile"+ this.currentUser.username]);
  }
}
