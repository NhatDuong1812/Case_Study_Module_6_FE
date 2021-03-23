import {song} from './song';
import {album} from "./album";

export interface singer {
  id?: number;
  name?: string;
  avatar?: string;
  description?: string;
  songs?: song[];
  albums?: album[];
}
