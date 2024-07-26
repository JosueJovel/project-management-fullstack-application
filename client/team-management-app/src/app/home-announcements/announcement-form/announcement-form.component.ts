import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../backend.service';
import { FullUserDto } from '../../models';

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.scss'],
})
export class AnnouncementFormComponent {
  createAnnouncementForm: FormGroup;

  @Output() close = new EventEmitter<void>();
  @Output() announcementCreated = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private backendService: BackendService) {
    this.createAnnouncementForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitAnnouncement() {
    if (this.createAnnouncementForm.valid) {
      const selectedCompanyString = localStorage.getItem('selectedCompany');
      const user = localStorage.getItem('user');
      if (user) {
        const authorString: FullUserDto = JSON.parse(user);

        const author = {
          id: authorString.id,
          profile: authorString.profile,
          isAdmin: authorString.isAdmin,
          active: authorString.active,
          status: authorString.status,
        };

        let companyId = -1; //Negative 1 should return an error from the backend incase there is no company
        if (selectedCompanyString) {
          const selectedCompany = JSON.parse(selectedCompanyString);
          companyId = selectedCompany.id;
        }

        const announcement = {
          ...this.createAnnouncementForm.value,
          author: author,
        };
        console.log('This is the content of the announcement' + announcement);
        this.backendService
          .createAnnouncement(companyId, announcement)
          .subscribe((response) => {
            this.announcementCreated.emit();
          });
      }
    }
  }

  closeForm() {
    this.close.emit();
  }
}
