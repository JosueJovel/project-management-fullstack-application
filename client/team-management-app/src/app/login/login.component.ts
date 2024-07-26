import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../backend.service';
import { CredentialsDto, FullUserDto } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      const usernameControl = this.loginForm.get('username');
      const passwordControl = this.loginForm.get('password');
  
      if (usernameControl?.hasError('required')) {
        this.errorMessage = 'Email is required.';
      } else if (usernameControl?.hasError('email')) {
        this.errorMessage = 'Invalid email format.';
      } else if (passwordControl?.hasError('required')) {
        this.errorMessage = 'Password is required.';
      } else {
        this.errorMessage = 'All fields are required.';
      }
      return;
    }
  
    const credentials: CredentialsDto = this.loginForm.value;
  
    this.backendService.login(credentials).subscribe({
      next: (user: FullUserDto) => {
        localStorage.setItem('user', JSON.stringify(user));
        if (user.isAdmin) {
          this.router.navigate(['/select-company']);
        } else {
          if (user.companies && user.companies.length > 0) {
            const selectedCompany = user.companies[0];
            localStorage.setItem('selectedCompany', JSON.stringify(selectedCompany));
          }
          this.router.navigate(['/home-announcements']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }
}
