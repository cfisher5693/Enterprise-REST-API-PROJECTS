import { Component, OnInit } from '@angular/core';
import { GithubService } from '../GithubAPI/github.service';

@Component({
  selector: 'app-user-state',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.css']
})
export class UserStateComponent implements OnInit {
  private name!: string;
  constructor(private githubService: GithubService) { }

  ngOnInit(): void {

  }

}
