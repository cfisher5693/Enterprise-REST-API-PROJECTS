import { UserResource } from "./user-resource";

export class RepoResource {
  full_name!: string;
  open_issues_count!: number;
  stargazers_count!: number;
  forks_count!: number;
  language!: string;
  url!: string;
  owner!: UserResource;
}
