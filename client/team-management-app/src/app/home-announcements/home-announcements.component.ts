import { Component, OnInit } from '@angular/core';
import { AnnouncementDto, CompanyDto, FullUserDto } from '../models';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-home-announcements',
  templateUrl: './home-announcements.component.html',
  styleUrls: ['./home-announcements.component.css'],
})
export class HomeAnnouncementsComponent implements OnInit {
  announcements: AnnouncementDto[] = [];
  showForm: boolean = false;
  user: FullUserDto | null = null;
  isAdmin: boolean = false;

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.loadAnnouncements();

    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData) as FullUserDto;
      this.isAdmin = this.user.isAdmin;
    }
  }

  loadAnnouncements(): void {
    const selectedCompanyString = localStorage.getItem('selectedCompany');
    if (selectedCompanyString) {
      const selectedCompany: CompanyDto = JSON.parse(selectedCompanyString);
      this.backendService
        .fetchAnnouncements(selectedCompany.id)
        .subscribe((announcements) => {
          this.announcements = announcements.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
        });
    } else {
      console.error('No company selected.');
    }
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }

  onAnnouncementCreated() {
    this.loadAnnouncements();
    this.showForm = false;
  }
}
