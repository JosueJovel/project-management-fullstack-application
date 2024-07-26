import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamCardComponent } from './teams/team-card/team-card.component';
import { LoginComponent } from './login/login.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { HomeAnnouncementsComponent } from './home-announcements/home-announcements.component';
import { CreateTeamCardComponent } from './teams/create-team-card/create-team-card.component';
import { TeamCreationPopupComponent } from './teams/team-creation-popup/team-creation-popup.component';
import { BackendService } from './backend.service';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamProjectsComponent } from './team-projects/team-projects.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AnnouncementFormComponent } from './home-announcements/announcement-form/announcement-form.component';
import { ProjectCreationPopupComponent } from './team-projects/project-creation-popup/project-creation-popup.component';
import { ProjectEditPopupComponent } from './team-projects/project-edit-popup/project-edit-popup.component';
import { UsersRegComponent } from './users-reg/users-reg.component';
import { AddUserOverlayComponent } from './users-reg/add-user-overlay/add-user-overlay.component';
import { ProjectsGuardService } from './projects-guard.service';
import { UsersGuardService } from './users-guard.service';
import { CompanyGuardService } from './company-guard.service';
import { LoginGuard } from './login-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'select-company', component: SelectCompanyComponent, canActivate: [LoginGuard, CompanyGuardService] }, //Introduce login guard to all routes to prevent routing when not logged in
  { path: 'home-announcements', component: HomeAnnouncementsComponent, canActivate: [LoginGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [LoginGuard] },
  { path: 'projects', component: TeamProjectsComponent, canActivate: [LoginGuard, ProjectsGuardService] }, //Provide the guard service that decides if route can be routed to
  { path: 'users-reg', component: UsersRegComponent, canActivate: [LoginGuard, UsersGuardService]},
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    TeamCardComponent,
    AppComponent,
    LoginComponent,
    SelectCompanyComponent,
    HomeAnnouncementsComponent,
    CreateTeamCardComponent,
    TeamCreationPopupComponent,
    NavbarComponent,
    TeamProjectsComponent,
    TeamCreationPopupComponent,
    AnnouncementFormComponent,
    ProjectCreationPopupComponent,
    ProjectEditPopupComponent,
    UsersRegComponent,
    AddUserOverlayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    provideClientHydration(),
    BackendService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
