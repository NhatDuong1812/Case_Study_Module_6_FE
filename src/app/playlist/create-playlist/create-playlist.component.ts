import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../model/playlist';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  playlist: Playlist = {};
  selectedImage: any = null;
  imgSrc: string = '';
  currentUser: any;
  username: any;
  createSuccess = false;

  constructor(private playlistService: PlaylistService, private activatedRoute: ActivatedRoute, private authService : AuthService, private route: Router, private storage: AngularFireStorage) {
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

  // tslint:disable-next-line:typedef
  createPlayList() {
    return this.playlistService.createNewPlayList(this.playlist, this.currentUser.username).toPromise();
  }

  // tslint:disable-next-line:typedef
  submit() {
    const filePath = `${this.playlist.name}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => {
          this.playlist.avatar = url;
          await this.createPlayList();
          this.createSuccess = true;
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.selectedImage = null;
    }
  }

  cancel() {
    this.route.navigate(["/profile/" + this.currentUser.username]);
  }
}
