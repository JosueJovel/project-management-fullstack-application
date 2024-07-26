import { Component, OnInit } from '@angular/core';
import { FullUserDto } from '../models';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent implements OnInit{
  showTeamCards: boolean = true;
  user: FullUserDto | null = null;
  isAdmin: boolean = false;

    ngOnInit(): void {
      //Verify whether current logged in user is admin or not.
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData) as FullUserDto;
        this.isAdmin = this.user.isAdmin;
      }
    }

    resetTeamCards() { //Method to reset team cards
      this.showTeamCards = false; // Hide the team cards
      setTimeout(() => this.showTeamCards = true, 0); // Show the team cards again
    }
}
