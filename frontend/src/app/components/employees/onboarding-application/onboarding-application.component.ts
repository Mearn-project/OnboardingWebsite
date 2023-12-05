import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-onboarding-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './onboarding-application.component.html',
  styleUrl: './onboarding-application.component.scss',
})
export class OnboardingApplicationComponent {
  onboardingForm: FormGroup;
  isSubmitted = false; // Track if form is submitted

  constructor(private fb: FormBuilder) {
    this.onboardingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      preferredName: [''],
      profilePicture: [null], // Will be handled separately for file upload
      address: this.fb.group({
        building: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      phoneNumbers: this.fb.group({
        cell: [''],
        work: [''],
      }),
      carInfo: this.fb.group({
        make: [''],
        model: [''],
        color: [''],
      }),
      email: [''],
      personalInfo: this.fb.group({
        ssn: [''],
        dob: [''],
        gender: [''],
      }),
      citizenshipStatus: [''],
      visaDetails: this.fb.group({
        visaType: [''],
        optReceipt: [null], // File upload
        visaTitle: [''],
        startDate: [''],
        endDate: [''],
      }),
      driverLicense: this.fb.group({
        hasLicense: [''],
        licenseNumber: [''],
        expirationDate: [''],
        licenseCopy: [null], // File upload
      }),
      reference: this.fb.group({
        firstName: [''],
        lastName: [''],
        middleName: [''],
        phone: [''],
        email: [''],
        relationship: [''],
      }),
      emergencyContacts: this.fb.array([this.createEmergencyContact()]),
      // ... other fields as needed
    });
  }

  // Method to add a new emergency contact
  addEmergencyContact(): void {
    const emergencyContacts = this.onboardingForm.get(
      'emergencyContacts'
    ) as FormArray;
    emergencyContacts.push(this.createEmergencyContact());
  }

  // Method to create an emergency contact FormGroup
  createEmergencyContact(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      phone: [''],
      email: [''],
      relationship: [''],
    });
  }

  // Method to handle file input changes
  onFileSelect(event: Event, controlName: string): void {
    console.log('Select file button pressed');
    // const file = (event.target as HTMLInputElement).files[0];
    // if (file) {
    //   this.onboardingForm.get(controlName).setValue(file);
    // }
  }

  // Method to submit the form
  submitForm(): void {
    this.isSubmitted = true;
    if (this.onboardingForm.invalid) {
      // Handle the invalid form case
      console.error('Form is invalid');
      return;
    }
    // TODO: Send the form data to server
    console.log('Form submitted raw', this.onboardingForm.value);
    // console.log('Form submitted');
  }
}
