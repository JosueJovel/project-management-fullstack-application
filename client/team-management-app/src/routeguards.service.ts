import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//This service helps us keep state of booleans that dicate wether we may navigate to certain routes (blocks routes from being accessed from anywhere)
export class RouteguardsService {
  private projectsNavigationAllowed: boolean = false; //variable that dictates if projects page may be accessed (for route guarding)
  private companyNavigationAllowed: boolean = false;
  private userNavigationAllowed: boolean = false;
  //This service will keep state for ALL navigation booleans

  constructor() { }

  allowProjectsNavigation() {
    this.projectsNavigationAllowed = true;
  }

  blockProjectsNavigation() {
    this.projectsNavigationAllowed = false;
  }

  isProjectsNavigationAllowed(): boolean {
    return this.projectsNavigationAllowed
  }

  allowCompanyNavigation() {
    this.companyNavigationAllowed = true;
  }

  blockCompanyNavigation() {
    this.companyNavigationAllowed = false;
  }

  isCompanyNavigationAllowed(): boolean {
    return this.companyNavigationAllowed
  }

  allowUserNavigation() {
    this.userNavigationAllowed = true;
  }

  blockUserNavigation() {
    this.userNavigationAllowed = false;
  }

  isUserNavigationAllowed(): boolean {
    return this.userNavigationAllowed
  }
}
