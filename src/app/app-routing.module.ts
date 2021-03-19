import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './user/homepage/homepage.component';
import {AuthGuard} from './helper/auth-guard';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {SongComponent} from './songpage/song/song.component';
import {CreatePlaylistComponent} from './playlist/create-playlist/create-playlist.component';
import {ListPlaylistComponent} from './playlist/list-playlist/list-playlist.component';
import {CreatesongComponent} from './song/createsong/createsong.component';
import {ListsongComponent} from './song/listsong/listsong.component';
import {EditsongComponent} from './song/editsong/editsong.component';
import {SearchSongComponent} from './songpage/search-song/search-song.component';
import {NewSongsComponent} from './songpage/new-songs/new-songs.component';
import {TopviewPlaylistsComponent} from './playlist/topview-playlists/topview-playlists.component';
import {CommentSongComponent} from './songpage/comment-song/comment-song.component';
import {SongMostLikeComponent} from './song-most-like/song-most-like.component';
import {PlayPlaylistComponent} from './playlist/play-playlist/play-playlist.component';
import {UpdatePlaylistComponent} from './playlist/update-playlist/update-playlist.component';
import {SearchPlaylistComponent} from './playlist/search-playlist/search-playlist.component';
import {ListsongPlaylistComponent} from './playlist/listsong-playlist/listsong-playlist.component';

const routes: Routes = [

  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createsong/:username',
    component: CreatesongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listsong/:username',
    component: ListsongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editsong/:username/:id',
    component: EditsongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'song/:id',
    component: SongComponent
  },
  {
    path: 'create-playlist/:username',
    component: CreatePlaylistComponent
  }, {
    path: 'list-playlist/:username',
    component: ListPlaylistComponent
  }, {
    path: 'update-playlist/:username/:id',
    component: UpdatePlaylistComponent
  }, {
    path: 'searchPlaylist/:keyword',
    component: SearchPlaylistComponent
  }, {
    path: 'search/:keyword',
    component: SearchSongComponent
  }, {
    path: 'latestSongs',
    component: NewSongsComponent
  }, {
    path: 'playlists/topView',
    component: TopviewPlaylistsComponent
  }, {
    path: 'comment/:id',
    component: CommentSongComponent
  }, {
    path: 'songs/topLike',
    component: SongMostLikeComponent
  }, {
    path: 'playlists/display/:id',
    component: PlayPlaylistComponent
  },{
    path: 'listsongs-playlist/:username/:id',
    component: ListsongPlaylistComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
