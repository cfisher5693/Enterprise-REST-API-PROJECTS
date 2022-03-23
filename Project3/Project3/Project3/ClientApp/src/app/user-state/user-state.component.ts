import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../GithubAPI/github.service';
import { RepoResource } from '../GithubAPI/repo-resource';
import { User } from '../GithubAPI/user';
import { UserResource } from '../GithubAPI/user-resource';

@Component({
  selector: 'app-user-state',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.css']
})
export class UserStateComponent implements OnInit {
  name!: string;
  function!: number;
  result!: User;
  repo_url!: string;
  follower_url!: string;
  resultA!: RepoResource[] | undefined;
  resultB!: UserResource[] | undefined;
  error!: string;
  constructor(private githubService: GithubService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.name = params.get('name') as string
    })
    this.githubService.getUser(this.name).subscribe({
      next: (results: User) => {
        this.result = results
        this.repo_url = results.repos_url
        this.follower_url = results.followers_url
      },
      error: (error) => this.error = error
    })
  }

  checkUrls(): void {
    console.log(this.repo_url);
    this.githubService.retrieveRepos(this.repo_url).subscribe({
      next: (results: RepoResource[]) => {
        this.resultA = results
      },
      error: (error) => this.error = error
    })
    this.githubService.retrieveFollowers(this.follower_url).subscribe({
      next: (results: UserResource[]) => {
        this.resultB = results
      },
      error: (error) => this.error = error
    })
    this.function = 1;
  }
}
