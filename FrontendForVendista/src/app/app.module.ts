import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { StubComponent } from './stub/stub.component';
import { TerminalsComponent } from './terminals/terminals.component';
import { UsersComponent } from './users/users.component';
import { OwnersComponent } from './owners/owners.component';
import { TidsComponent } from './tids/tids.component';

const appRoutes: Routes = [
  { path: 'owners', component: OwnersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'terminals', component: TerminalsComponent },
  { path: 'tids', component: TidsComponent },
  { path: 'stub', component: StubComponent },
  {
    path: '**',
    redirectTo: '/stub',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    StubComponent,
    OwnersComponent,
    UsersComponent,
    TerminalsComponent,
    TidsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
