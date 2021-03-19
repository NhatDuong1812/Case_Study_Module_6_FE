import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../model/playlist';
import {PlaylistService} from '../../service/playlist/playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {userdetail} from '../../model/userdetail';
import {AngularFireStorage} from '@angular/fire/storage';
import {AuthService} from '../../service/auth/auth.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-update-playlist',
  templateUrl: './update-playlist.component.html',
  styleUrls: ['./update-playlist.component.css']
})
export class UpdatePlaylistComponent implements OnInit {
  playlist: Playlist = {};
  id: number = -1;
  currentUser: any;
  updateSuccess = false;
  selectedImage: any = null;
  username: any;
  userDetail: userdetail = {};


  constructor(private playlistService: PlaylistService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private authService: AuthService,
              private  route: Router) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    });
  }

  ngOnInit(): void {
    this.updateSuccess = false;
    this.activatedRoute.paramMap.subscribe(async paramMap => {
      // @ts-ignore
      this.id = +paramMap.get('id');
      this.playlistService.getPlayListById(this.id).subscribe(playlist => {
        this.playlist = playlist;
        console.log(playlist.name);
      });
    });
  }

  getPlayList(id: number){
    this.playlistService.getPlayListById(id).subscribe(value => {
      this.playlist = value;
    });
  }
  updatePlayList(id: number) {
    this.playlistService.updatePlayList(this.currentUser.username, id, this.playlist).subscribe(() => {
      this.updateSuccess = true;
    });
  }

  // tslint:disable-next-line:typedef
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.submit();
    } else {
      this.selectedImage = null;
    }
  }

  submit() {
    const filePath = `${this.playlist.name}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(async url => {
          this.playlist.avatar = url;
        });
      })
    ).subscribe();
  }
  cancel() {
    this.route.navigate(['/list-playlist/' + this.currentUser.username]);
  }

}
