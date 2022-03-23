import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Commit } from '../GithubAPI/commit';
import { GithubService } from '../GithubAPI/github.service';
import { Issue } from '../GithubAPI/issue';
import { Repo } from '../GithubAPI/repo';

@Component({
  selector: 'app-repo-state',
  templateUrl: './repo-state.component.html',
  styleUrls: ['./repo-state.component.css']
})
export class RepoStateComponent implements OnInit {
  name!: string;
  result!: Repo;
  error!: string;
  function!: number;
  commit_url!: string;
  issue_url!: string;
  resultA!: Commit[];
  resultB: Issue[] = [];
  constructor(private githubService: GithubService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.name = params.get('name') as string
    })
    this.githubService.getRepo(this.name).subscribe({
      next: (results: Repo) => {
        this.result = results
        this.commit_url = results.commits_url
        this.issue_url = results.issues_url
      },
      error: (error) => this.error = error
    })
  }

  checkUrls(): void {
    this.commit_url = this.commit_url.replace("{/sha}", "");
    this.issue_url = this.issue_url.replace("{/number}", "");
    console.log(this.commit_url);
    console.log(this.issue_url);
    this.githubService.retrieveCommits(this.commit_url).subscribe({
      next: (results: Commit[]) => {
        this.resultA = results
      },
      error: (error) => this.error = error
    })
    for (let i = 1; i < 6; i++) {
      this.githubService.retrieveIssues(this.issue_url, i).subscribe({
        next: (results: Issue) => {
          this.resultB.push(results)
        },
        error: (error) => this.error = error
      })
    }
    this.function = 1;
  }
}
