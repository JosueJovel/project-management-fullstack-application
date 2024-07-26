import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate { //This guard checks wether there is a logged in user, and if there isnt, redirect client to /login page

  constructor(private router: Router) {}

  canActivate(): boolean {

    if (!localStorage.getItem('user')) { //If user is null, this condition will evaluate to true
      this.router.navigate(['/login']);
      return false;
    }
    return true; //If there IS a logged in user, we will indicate that the route may be routed to.
  }
}