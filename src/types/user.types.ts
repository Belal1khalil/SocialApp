import { Post } from "./posts.types";

export interface User {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
}

export type userState = {
  token: null | string;
  userData: User | null;
  isLoading: boolean;
  userPosts: Post[] | null;
};