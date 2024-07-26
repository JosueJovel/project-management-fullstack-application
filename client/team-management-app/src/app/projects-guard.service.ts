import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RouteguardsService } from '../routeguards.service';

@Injectable({
  providedIn: 'root'
})
//This Guard service is SPECIFICALLY built for /projects. Other routes need their own guards.
export class ProjectsGuardService implements CanActivate {
  constructor(private routeGuardService: RouteguardsService, private router: Router) {}

  canActivate(): boolean {
    if (!this.routeGuardService.isProjectsNavigationAllowed()) { //If routing to projects is not currently allowed
        this.router.navigate(['/teams']); //Redirect to /teams
      return false;
    }
    return true;
  }
}
