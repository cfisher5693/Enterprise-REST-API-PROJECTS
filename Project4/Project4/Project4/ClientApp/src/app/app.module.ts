import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TodoManagementComponent } from './todo-management/todo-management.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { TodoChangeComponent } from './todo-change/todo-change.component';
import { TodoSettingsComponent } from './todo-settings/todo-settings.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TodoManagementComponent,
    TodoEditComponent,
    TodoChangeComponent,
    TodoSettingsComponent,
    SortByComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: TodoManagementComponent, pathMatch: 'full' },
      { path: 'todo-management', component: TodoManagementComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
