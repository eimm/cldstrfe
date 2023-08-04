import { User } from "./auth.dto";

export interface File {
  id: number;
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
  user: User;
  deletedAt: string | null;
}

export type FileType = "all" | "images" | "bin";
