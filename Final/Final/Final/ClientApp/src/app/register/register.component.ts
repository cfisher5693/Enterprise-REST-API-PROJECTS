import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login-service.service';
import { UserCreds } from '../login/user-creds';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userCreds: UserCreds = new UserCreds();
  errorMessage!: string;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.userCreds.username = "";
    this.userCreds.password = "";
  }

  createUser() {
    this.loginService.createUser(this.userCreds).subscribe(() => {
      this.router.navigate(['/login']);
    }, (error) => {
      this.errorMessage = error;
    })
  }
}
