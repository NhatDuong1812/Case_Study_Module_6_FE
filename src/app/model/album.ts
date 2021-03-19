import {singer} from "./singer";
import {User} from "./user";

export interface album {
  id?: number;
  name?: string;
  creationTime?: any;
  numberOfView?: number;
  singers?: singer[];
  user?: User;
}
