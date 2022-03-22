import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { GithubSearchComponent } from './github-search/github-search.component';
import { UserStateComponent } from './user-state/user-state.component';
import { RepoStateComponent } from './repo-state/repo-state.component';
import { LoginStateComponent } from './login-state/login-state.component';
import { AuthGuard } from './login/auth.guard';
import { AuthInterceptor } from './login/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    GithubSearchComponent,
    UserStateComponent,
    RepoStateComponent,
    LoginStateComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: GithubSearchComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'github-search', component: GithubSearchComponent, canActivate: [AuthGuard] },
      { path: 'user/:name', component: UserStateComponent, canActivate: [AuthGuard] },
      { path: 'repos/:name', component: RepoStateComponent, canActivate: [AuthGuard] },
      { path: 'login-state', component: LoginStateComponent },
    ])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
