import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GithubService } from '../GithubAPI/github.service';
import { RepoList } from '../GithubAPI/repo-list';
import { RepoResource } from '../GithubAPI/repo-resource';
import { UserList } from '../GithubAPI/user-list';
import { UserResource } from '../GithubAPI/user-resource';

@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.css']
})
export class GithubSearchComponent implements OnInit {
  searchForm = new FormGroup({
    searchQuery: new FormControl(""),
    searchSelection: new FormControl(""),
  });

  result1a: UserResource[] | undefined;
  result1b: RepoResource[] | undefined;
  result2: string = "";
  error!: string;
  count!: number;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
  }

  private resetState() {
    this.error = "";
    this.result1a = undefined;
    this.result1b = undefined;
  }

  searchGithub(): void {
    this.resetState();
    this.result2 = this.searchForm.get('searchSelection')?.value;
    if (this.result2 == 'user') {
      let nameForSearch = this.searchForm.get('searchQuery')?.value;
      this.githubService.searchForUsers(nameForSearch).subscribe({
        next: (results: UserList) => {
          this.result1a = results.items
          this.count = results.total_count
        },
        error: (error) => this.error = error
      })
      if (this.count == 0) {
        this.error = "No results found!"
      }
    }
    else {
      let nameForSearch = this.searchForm.get('searchQuery')?.value;
      this.githubService.searchForRepositories(nameForSearch).subscribe({
        next: (results: RepoList) => {
          this.result1b = results.items
          this.count = results.total_count
        },
        error: (error) => this.error = error
      })
      if (this.count == 0) {
        this.error = "No results found!"
      }
    }
  }
}
