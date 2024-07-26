import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyDto, FullUserDto } from '../models';
import { RouteguardsService } from '../../routeguards.service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css'],
})
export class SelectCompanyComponent implements OnInit{
  selectedCompany: CompanyDto | null = null;
  companies: CompanyDto[] = [];

  constructor(private router: Router, private routeguardsService: RouteguardsService) {}

  ngOnInit(): void {
    this.routeguardsService.blockCompanyNavigation(); //Block direct navigation to this page upon arriving
    const userString = localStorage.getItem('user');
    if (userString) {
      const user: FullUserDto = JSON.parse(userString);
      this.companies = user.companies;
    }
  }

  onSelectCompany(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedCompanyName = selectElement.value;
    this.selectedCompany = this.companies.find(company => company.name === selectedCompanyName) || null;
    if (this.selectedCompany) {
      localStorage.setItem('selectedCompany', JSON.stringify(this.selectedCompany)); //save company in local storage & and goto home/announcemnets page -Devin
      this.router.navigate(['/home-announcements']); 
    }
  }
}
