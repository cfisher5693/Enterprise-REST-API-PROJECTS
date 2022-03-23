import { CommitType } from "./commit-type";
import { User } from "./user";

export class Commit {
  html_url!: string;
  author!: User;
  commit!: CommitType;
}
