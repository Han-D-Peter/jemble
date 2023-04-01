import { User } from "@/interface/model/user";

export type Union = {
  id: string;
  name: string;
  union_image: string;
  points: number;
  rank: number;
  user: User[];
};
