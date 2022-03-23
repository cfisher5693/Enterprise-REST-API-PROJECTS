import { UserResource } from "./user-resource";

export class RepoResource {
  name!: string;
  full_name!: string;
  open_issues_count!: number;
  stargazers_count!: number;
  forks_count!: number;
  language!: string;
  html_url!: string;
  url!: string;
  owner!: UserResource;
}
