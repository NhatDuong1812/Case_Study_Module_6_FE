import {song} from './song';
import {album} from "./album";

export interface singer {
  id  ?: number;
  name?: string;
  description?: string;
  avatar?: string;
  songs ?: song[];
  albums?: album[];
}
