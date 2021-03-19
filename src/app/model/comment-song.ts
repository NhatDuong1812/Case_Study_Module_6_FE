import {User} from './user';
import {song} from './song';

export interface CommentSong{
  id?: number;
  content?: string;
  user?: User;
  song?: song;
  creationTime?: string
}
