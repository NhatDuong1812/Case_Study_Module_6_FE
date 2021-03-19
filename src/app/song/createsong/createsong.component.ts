import { Component, OnInit } from '@angular/core';
import {SongService} from '../../service/song/song.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {SingerService} from '../../service/singer/singer.service';
import {song} from '../../model/song';
import {singer} from '../../model/singer';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';

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


  constructor(private activatedRoute : ActivatedRoute, private authService : AuthService, private route: Router, private songService : SongService, private storage : AngularFireStorage, private singerService : SingerService) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      this.username = paramMap.get('username');
      console.log(this.username)
    })
  }
  createSong(){
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
          await this.submitFile();
          this.createSuccess = false;
        });
      })
    ).subscribe();
  }
  // tslint:disable-next-line:typedef
  submitFile(){ // Tai file nhac len firebase, lua duong dan vao db.
    const filePathFile = `${this.song.name}/${this.selectedFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePathFile);
    this.storage.upload(filePathFile, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => { // Lay duong dan tren file
          this.song.file = url;
          await this.createSong();
          this.createSuccess = true;
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
