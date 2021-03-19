import {User} from './user';
import {song} from './song';
import {Playlist} from './playlist';

export interface CommentPlaylist{
  id?: number;
  content?: string;
  user?: User;
  playlist?: Playlist;
  creationTime?: string
}
