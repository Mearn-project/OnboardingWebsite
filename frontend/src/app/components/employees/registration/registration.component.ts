import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { RegistrationService } from '../../../services/registration.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'employee-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private registrationService: RegistrationService,
    private http: HttpClient,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPwd: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form is valid', this.registrationForm.value);
      this.http
        .post(
          'http://localhost:3000/api/user/register/complete',
          this.registrationForm.value
        )
        .subscribe({
          next: (response) => {
            console.log('User registered successfully:', response);
          },
          error: (error) => {
            console.error('Error registering user:', error);
          },
        });
      // this.registrationService.register(this.registrationForm.value).subscribe(
      //   (success) => {
      //     // TODO: Show message
      //     console.log(success);
      //     this.router.navigate(['/personal-information']);
      //   },
      //   (error) => {
      //     console.error('Registration failed', error);
      //   }
      // );
    }
  }
}
