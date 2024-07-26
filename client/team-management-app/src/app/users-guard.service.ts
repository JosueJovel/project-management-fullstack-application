import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RouteguardsService } from '../routeguards.service';

@Injectable({
  providedIn: 'root'
})
//This Guard service is SPECIFICALLY built for /users. Other routes need their own guards.
export class UsersGuardService implements CanActivate {
  constructor(private routeGuardService: RouteguardsService, private router: Router) {}

  canActivate(): boolean {
    if (!this.routeGuardService.isUserNavigationAllowed()) { //If routing to users is not currently allowed
        this.router.navigate(['/home-announcements']); //Redirect to /home
      return false;
    }
    return true;
  }
}
