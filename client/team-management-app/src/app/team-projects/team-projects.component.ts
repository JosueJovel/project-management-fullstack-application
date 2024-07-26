import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { FullUserDto, ProjectDto, TeamDto } from '../models';
import { RouteguardsService } from '../../routeguards.service';

@Component({
  selector: 'app-team-projects',
  templateUrl: './team-projects.component.html',
  styleUrl: './team-projects.component.css'
})
export class TeamProjectsComponent implements OnInit{
  teamProjects: ProjectDto[] = [];
  currentTeam: TeamDto;
  showCreateProjectPopup: boolean = false;
  showEditProjectPopup: boolean = false;
  projectData: ProjectDto; //We will pass this variable down to the edit project child popup
  user: FullUserDto | null = null;
  isAdmin: boolean = false;
  
  constructor(private backendService: BackendService, private routerGuardService: RouteguardsService){}

  async ngOnInit(): Promise<void> {
    //Verify whether current logged in user is admin or not.
    //First, block direct routing to projects again
    this.routerGuardService.blockProjectsNavigation()
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData) as FullUserDto;
      this.isAdmin = this.user.isAdmin;
    }
  
    this.currentTeam = this.backendService.getCurrentTeam(); //Fetch the current team we are observing from our service
    this.teamProjects = await this.backendService.getTeamProjects(this.currentTeam); //Fetch [ProjectDto] with current TeamDto to display from our service(and therefore our backend)
  }

  openProjectPopup() {
    this.showCreateProjectPopup = true;
  }

  async closeProjectPopup() {
    this.teamProjects = await this.backendService.getTeamProjects(this.currentTeam); //Fetch projects from DB
    this.showCreateProjectPopup = false;
  }

  openEditProjectPopup(project: ProjectDto) {
    this.projectData = project; //Saving the project being edited for our popup to fetch/manipulate
    this.showEditProjectPopup = true;
  }

  async closeEditProjectPopup() {
    this.teamProjects = await this.backendService.getTeamProjects(this.currentTeam); //Fetch projects from DB
    this.showEditProjectPopup = false;

  }

  async updateTeamProjectsFromDatabase() {
    this.teamProjects = await this.backendService.getTeamProjects(this.currentTeam); //Fetch newest version of projects in the database
  }

  projectStatus(status: boolean): string {
    if (status) {
      return "Active";
    } else {
      return "Inactive"
    }
  }
}
