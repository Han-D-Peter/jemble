import { Union } from "./union";

export type User = {
  id: string;
  name: string;
  email: string;
  profile_image: string;
  points: number;
  unionId?: string | null;
  union?: Union | null;
  friends?: User[];
};
