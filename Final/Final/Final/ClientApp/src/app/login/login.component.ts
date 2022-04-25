import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login-service.service';
import { UserCreds } from './user-creds';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userCreds: UserCreds = new UserCreds();
  errorMessage!: string;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  loginUser() {
    this.loginService.login(this.userCreds).subscribe(() => {
      this.router.navigate(['/todo-management'])
    },
      (error => {
        this.errorMessage = error;
      }));
  }
}
