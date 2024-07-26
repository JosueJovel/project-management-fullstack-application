import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../models';
import { RouteguardsService } from '../../routeguards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: FullUserDto | null = null;
  isAdmin: boolean = false;

  constructor(private routeguardsService: RouteguardsService, private router: Router) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData) as FullUserDto;
      this.isAdmin = this.user.isAdmin;
    }
  }

  logout() {
    //clear local storage on logout
    localStorage.clear();
  }

  loadUsersPage() { //Route to users-reg
    this.routeguardsService.allowUserNavigation();
    this.router.navigate(['/users-reg']);  
  }

  loadCompanyPage() { //Route to select-company
    this.routeguardsService.allowCompanyNavigation();
    this.router.navigate(['/select-company']);  
  }
}
