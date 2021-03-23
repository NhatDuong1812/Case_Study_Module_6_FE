import { Component, OnInit } from '@angular/core';
import {SongService} from '../../service/song/song.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {SingerService} from '../../service/singer/singer.service';
import {song} from '../../model/song';
import {singer} from '../../model/singer';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-createsong',
  templateUrl: './createsong.component.html',
  styleUrls: ['./createsong.component.css']
})
export class CreatesongComponent implements OnInit {
  singers : singer[] = [];
  song : song = {};
  singerList : singer[] = [];
  selectedImage: any = null;
  selectedFile: any = null;
  imgSrc: string = '';
  fileSrc: string = '';
  currentUser : any;
  username : any;
  createSuccess = false;

  maxProgress = 100;
  maxLoading = 70;
  progressLoading = 0;
  myBar = 'width: 0%';
  loadFlag = true;
  audioFile: File;
  downloadURL: Observable<string>;

  elem = document.getElementById("myBar") as HTMLElement;

  constructor(private activatedRoute : ActivatedRoute,
              private authService : AuthService,
              private route: Router,
              private songService : SongService,
              private storage : AngularFireStorage,
              private singerService : SingerService) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.username = paramMap.get('username');
      console.log(this.username)
    });

  }

  getFile(event){
    this.audioFile = event.target.files[0];
    console.log(this.audioFile);
  }

  uploadFile(){
    var n = Date.now();
    const file = this.audioFile
    const filePath = `Sound/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`Sound/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.song.file = url;
              this.createSuccess = true;
              this.createSong();
              this.progressLoading == this.maxProgress;
              this.myBar = `width:  ${this.maxProgress}%`;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
          if (this.progressLoading <= this.maxLoading){
            this.progressLoading+=5;
            this.myBar = `width:  ${this.progressLoading}%`;
          }
        }
      });
  }

  // loadingBar(){
  //   for(let i = 0; i <= this.maxLoading; i++){
  //     this.progressLoading +=i;
  //     console.log(i);
  //     this.myBar = `width:  ${this.progressLoading}%`;
  //     if(this.progressLoading == this.maxLoading) break;
  //   }
  // }

  createSong(){
    console.log(this.song);
    return this.songService.createSong(this.song, this.currentUser.username).toPromise();
    
  }
  // tslint:disable-next-line:typedef
  submit(){ // Tai anh len firebase, lua duong dan vao db.
    const filePath = `${this.song.name}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => { // Lay duong dan tren anh
          this.song.avatar = url;
          await this.uploadFile();
          this.createSuccess = false;
          
        });
      })
    ).subscribe();
  }

  // tslint:disable-next-line:typedef
  showPreview(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }
  }
  showPreviewFile(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }
  cancel(){
    this.route.navigate(["/listsong/" + this.currentUser.username]);
  }

}
