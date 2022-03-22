import { Component, OnInit } from '@angular/core';
import { GithubService } from '../GithubAPI/github.service';

@Component({
  selector: 'app-repo-state',
  templateUrl: './repo-state.component.html',
  styleUrls: ['./repo-state.component.css']
})
export class RepoStateComponent implements OnInit {
  private name!: string;
  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
  }

}
