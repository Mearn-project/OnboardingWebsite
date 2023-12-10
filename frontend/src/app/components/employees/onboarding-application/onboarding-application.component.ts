import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Application {
  firstName: any;
  lastName: any;
  middleName: any;
  preferredName: any;
  profilePictureUrl: any;
  address: any;
  cellPhone: any;
  workPhone: any;
  carInformation: any;
  email: any;
  ssn: any;
  dateOfBirth: any;
  gender: any;
  isUSCitizen: any;
  workAuthorization: any;
  // workAuthorizationUrl: uploadedFiles.find((file) => file.orginalname === 'workAuthorization')?.Location || '',
  optReceiptUrl: any;
  visaTitle: any;
  startDate: any;
  endDate: any;
  hasDriverLicense: any;
  licenseNumber: any;
  licenseExpirationDate: any;
  licenseCopyUrl: any;
  reference: any;
  emergencyContacts: any;
  [key: string]: any;
}

@Component({
  selector: 'employee-onboarding-application',
  templateUrl: './onboarding-application.component.html',
  styleUrl: './onboarding-application.component.scss',
})
export class OnboardingApplicationComponent {
  onboardingForm: FormGroup;
  isSubmitted = false; // Track if form is submitted

  selectedOptReceipt: File | null = null;
  selectedProfilePicture: File | null = null;
  selectedDriverLicense: File | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.onboardingForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        preferredName: [''],
      }),
      profilePicture: [null], // Will be handled separately for file upload
      address: this.fb.group({
        buildingApt: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
      }),
      phoneNumbers: this.fb.group({
        cell: ['', Validators.required],
        work: [''],
      }),
      carInfo: this.fb.group({
        make: [''],
        model: [''],
        color: [''],
      }),
      email: ['', Validators.required],
      personalInfo: this.fb.group({
        ssn: ['', Validators.required],
        dob: ['', Validators.required],
        gender: [''],
      }),
      isUSCitizen: ['', Validators.required],
      visaDetails: this.fb.group({
        visaType: [''], // workAuthorization
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
  onFileSelect(event: Event, field: string): void {
    // console.log('Select file button pressed');
    // const file = (event.target as HTMLInputElement).files[0];
    // if (file) {
    //   this.onboardingForm.get(controlName).setValue(file);
    // }
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      if (field === 'optReceiptUrl') {
        this.selectedOptReceipt = file;
      } else if (field === 'licenseCopyUrl') {
        this.selectedDriverLicense = file;
      } else if (field === 'profilePictureUrl') {
        this.selectedProfilePicture = file;
      }
      // Handle other fields if needed
    }
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
    // console.log('Form submitted raw', this.onboardingForm.value);
    const application = this.onboardingForm.value;
    const formData = new FormData();

    const fieldsToAppend = [
      { name: 'firstName', value: application.name.firstName },
      { name: 'lastName', value: application.name.lastName },
      { name: 'middleName', value: application.name.middleName || '' },
      { name: 'preferredName', value: application.name.preferredName || '' },
      { name: 'profilePictureUrl', value: this.selectedProfilePicture || '' },
      { name: 'address', value: JSON.stringify(application.address)},
      { name: 'cellPhone', value: application.phoneNumbers.cell },
      { name: 'workPhone', value: application.phoneNumbers.work || '' },
      { name: 'carInformation', value: JSON.stringify(application.carInfo || { make: '', model: '', color: '' }) },
      { name: 'email', value: application.email },
      { name: 'ssn', value: application.personalInfo.ssn },
      { name: 'dateOfBirth', value: application.personalInfo.dob },
      { name: 'gender', value: application.personalInfo.gender || 'I do not wish to answer' },
      { name: 'isUSCitizen', value: application.isUSCitizen === 'Yes' ? 'true' : 'false' },
      { name: 'workAuthorization', value: application.visaDetails.visaType || 'Citizen' },
      { name: 'optReceiptUrl', value: this.selectedOptReceipt || '' },
      { name: 'visaTitle', value: application.visaDetails.visaTitle || '' },
      { name: 'startDate', value: application.visaDetails.startDate || '' },
      { name: 'endDate', value: application.visaDetails.endDate || '' },
      { name: 'hasDriverLicense', value: application.driverLicense.hasDriverLicense === 'Yes' ? 'true' : 'false' },
      { name: 'licenseNumber', value: application.driverLicense.licenseNumber || '' },
      { name: 'licenseExpirationDate', value: application.driverLicense.licenseExpirationDate || '' },
      { name: 'licenseCopyUrl', value: this.selectedDriverLicense || '' },
      { name: 'reference', value: JSON.stringify(application.reference || {
        email: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '',
        relationship: ''
      }) },
      { name: 'emergencyContacts', value: JSON.stringify(application.emergencyContacts || []) }
    ];
  
    for (const field of fieldsToAppend) {
      formData.append(field.name, field.value);
    }

    // console.log(application.profilePicture)

    // formData.append('applicationData', formData);
    // console.log(formData)
    this.http.post('http://localhost:3000/application', formData, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log('Application submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting application:', error);
        }
      })
  }
}
