import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginService } from '../login/login.service';
import { TokenResponse } from '../login/token-response';

@Component({
  selector: 'app-login-state',
  templateUrl: './login-state.component.html',
  styleUrls: ['./login-state.component.css']
})
export class LoginStateComponent implements OnInit {
  loginUrl!: string;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loginUrl = `https://github.com/login/oauth/authorize?client_id=${environment.clientId}&redirect_uri=${window.location.href}`;
    let code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.loginService.requestAccessToken(code).subscribe(
        (tokenResponse: TokenResponse) => {
          this.loginService.setToken(tokenResponse.access_token);
          this.router.navigateByUrl(this.loginService.getRedirectUrl());
        }
      )
    }
  }
}
