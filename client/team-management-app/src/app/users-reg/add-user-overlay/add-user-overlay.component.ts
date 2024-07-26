import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../backend.service';
import { CredentialsDto, ProfileDto, UserRequestDto } from '../../models';

@Component({
  selector: 'app-add-user-overlay',
  templateUrl: './add-user-overlay.component.html',
  styleUrl: './add-user-overlay.component.css',
})
export class AddUserOverlayComponent {
  createUserForm: FormGroup;
  errorMessage: string | undefined;

  @Output() close = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private backendService: BackendService) {
    this.createUserForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      isAdmin: [null, Validators.required],
    });
  }

  async onSubmit() {
    if (this.createUserForm.invalid) {
      this.errorMessage = 'All fields are required.'; //Sets the error message if Validators detemines this is a invalid login attempt -Devin
      return;
    }
    if ((this, this.createUserForm.valid)) {
      const user = {
        ...this.createUserForm.value,
      };
      if (user.password !== user.confirmPassword) {
        this, (this.errorMessage = 'Passwords do not match');
        return;
      }
      const credentials: CredentialsDto = {
        username: user.email,
        password: user.password
      };
      const profile: ProfileDto = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone
      }
      const userRequest: UserRequestDto = {
        credentials: credentials,
        profile: profile,
        isAdmin: user.isAdmin
      }


      const selectedCompanyString = localStorage.getItem('selectedCompany');
      if (selectedCompanyString) {
        const selectedCompany = JSON.parse(selectedCompanyString);
        const result = await this.backendService.createUser(userRequest, selectedCompany.id);
        if(result.success) {
          this.userCreated.emit();
          } else {
            this.errorMessage = result.error;
          }
      }
    }
    
    

    
  }

  closePopup() {
    this.close.emit();
  }
}
