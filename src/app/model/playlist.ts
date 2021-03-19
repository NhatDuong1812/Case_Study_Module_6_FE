import {song} from './song';
import {User} from './user';

export interface Playlist{
  id?: number;
  name?: string;
  creationTime?: any;
  user?: User;
  songs?: song[];
  avatar?: string;
  view?: number;
}
