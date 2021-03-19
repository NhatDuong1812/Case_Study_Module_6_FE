import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbCarouselModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FooterComponent} from './shared/footer/footer.component';
import {HeaderComponent} from './shared/header/header.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {HomepageComponent} from './user/homepage/homepage.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {SongComponent} from './songpage/song/song.component';
import {CreatePlaylistComponent} from './playlist/create-playlist/create-playlist.component';
import { ListPlaylistComponent } from './playlist/list-playlist/list-playlist.component';
import { UpdatePlaylistComponent } from './playlist/update-playlist/update-playlist.component';
import {DeletePlaylistComponent} from './playlist/delete-playlist/delete-playlist.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CreatesongComponent} from './song/createsong/createsong.component';
import { ListsongComponent } from './song/listsong/listsong.component';
import {EditsongComponent} from './song/editsong/editsong.component';
import { DeletesongComponent } from './song/deletesong/deletesong.component';
import {SearchSongComponent} from './songpage/search-song/search-song.component';
import {NewSongsComponent} from './songpage/new-songs/new-songs.component';
import { ListPlaylistnewComponent } from './playlist/list-playlistnew/list-playlistnew.component';
import { SongMostviewComponent } from './song-mostview/song-mostview.component';
import { TopviewPlaylistsComponent } from './playlist/topview-playlists/topview-playlists.component';
import { PlaylistMostLikeComponent } from './playlist/playlist-most-like/playlist-most-like.component';
import { CommentSongComponent } from './songpage/comment-song/comment-song.component';
import { SongMostLikeComponent } from './song-most-like/song-most-like.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PlayPlaylistComponent} from "./playlist/play-playlist/play-playlist.component";
import { ListsongPlaylistComponent } from './playlist/listsong-playlist/listsong-playlist.component';
import {SearchPlaylistComponent} from "./playlist/search-playlist/search-playlist.component";
import { CommentPlaylistComponent } from './comment-playlist/comment-playlist.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,

    ProfileComponent,
    SongComponent,
    CreatePlaylistComponent,
    ListPlaylistComponent,
    UpdatePlaylistComponent,
    DeletePlaylistComponent,
    ProfileComponent,
    CreatesongComponent,
    ListsongComponent,
    EditsongComponent,
    DeletesongComponent,
    SearchSongComponent,
    NewSongsComponent,
    ListPlaylistnewComponent,
    SongMostviewComponent,
    TopviewPlaylistsComponent,
    PlaylistMostLikeComponent,
    CommentSongComponent,
    SongMostLikeComponent,
    PlayPlaylistComponent,
    ListsongPlaylistComponent,
    SearchPlaylistComponent,
    CommentPlaylistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    NgbCarouselModule,
    NgxAudioPlayerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
