import { Document } from './../../../models/visa-status.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { Doc, EditModeKeys } from 'src/app/models/personal-info.model';
import { EmployeeVisaStatusService } from 'src/app/services/employee-visa-status.service';

@Component({
  selector: 'employee-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent implements OnInit {
  userData?: any;
  personalInfoForm: FormGroup;
  nameForm: FormGroup;
  documents: Array<Doc>;
  currentSection: EditModeKeys;
  editMode: { [key in EditModeKeys]: boolean } = {
    name: false,
    address: false,
    contactInfo: false,
    employment: false,
    emergencyContact: false,
    documents: false,
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public userService: UserService,
    public visaService: EmployeeVisaStatusService
  ) {
    this.personalInfoForm = new FormGroup({});
    this.nameForm = new FormGroup({});
    this.documents = [];
    this.currentSection = 'name';
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserInfo();
    this.loadDocuments();
  }

  initializeForm(): void {
    this.personalInfoForm = this.fb.group({
      name: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        preferredName: [''],
      }),
      address: this.fb.group({
        building: [''],
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      }),
      contactInfo: this.fb.group({
        cell: [''],
        work: [''],
      }),
      employment: this.fb.group({
        visaTitle: [''],
        startDate: [''],
        endDate: [''],
      }),
      emergencyContact: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        middleName: [''],
        phone: [''],
        email: [''],
        relationship: [''],
      }),
    });
  }

  loadUserInfo(): void {
    this.userService.getUserInfo().subscribe({
      next: (data) => {
        console.log(data);
        const personalInfo = data.application;
        const emergencyContact = personalInfo.emergencyContacts;
        this.personalInfoForm.patchValue({
          name: {
            firstName: personalInfo.firstName || '',
            lastName: personalInfo.lastName || '',
            middleName: personalInfo.middleName || '',
            preferredName: personalInfo.preferredName || '',
          },
          address: {
            building: personalInfo.address.buildingApt || '',
            street: personalInfo.address.street || '',
            city: personalInfo.address.city || '',
            state: personalInfo.address.state || '',
            zip: personalInfo.address.zip || '',
          },
          contactInfo: {
            cell: personalInfo.cellPhone || '',
            work: personalInfo.workPhone || '',
          },
          employment: {
            visaTitle: personalInfo.visaTitle || '',
            startDate: personalInfo.startDate || '',
            endDate: personalInfo.endDate || '',
          },
          emergencyContact: {
            firstName: emergencyContact.firstName || '',
            lastName: emergencyContact.lastName || '',
            middleName: emergencyContact.middleName || '',
            phone: emergencyContact.phone || '',
            email: emergencyContact.email || '',
            relationship: emergencyContact.relationship || '',
          },
        });
        // TODO: load document
        this.userData = personalInfo;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      },
    });
  }

  getFormGroup(section: string): FormGroup {
    const formGroup = this.personalInfoForm.get(section);
    if (!formGroup) {
      throw new Error(`Form group for section '${section}' not found`);
    }
    return formGroup as FormGroup;
  }

  toggleEdit(section: EditModeKeys): void {
    this.editMode[section] = !this.editMode[section];
    this.currentSection = section;
    console.log('after toggle edit: ', this.currentSection);
  }

  save(section: EditModeKeys): void {
    console.log('infoForm data: ', this.personalInfoForm);
    const sectionGroup = this.personalInfoForm.get(section);
    const formData = new FormData();
    for (const controlName of Object.keys(sectionGroup?.value)) {
      formData.append(controlName, sectionGroup?.value.controlName);
    }
    if (sectionGroup?.valid) {
      this.userService.updateSection(section, sectionGroup.value).subscribe({
        next: () => {
          // Handle the successful response here, e.g., showing a success message
          console.log('Update successful');
          this.editMode[section] = false;
          this.loadUserInfo();
        },
        error: () => {
          // Handle errors here, e.g., showing an error message
          console.error('Update failed');
        },
      });
    }
  }

  cancel(section: EditModeKeys): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Discard all changes?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'yes') {
        this.initializeForm(); // Reset form with initial data
        this.editMode[this.currentSection] = false;
        this.loadUserInfo();
      }
    });
  }

  loadDocuments(): void {
    this.visaService.getVisaStatus().subscribe({
      next: (visaStatus) => {
        for (const visa of Object.keys(visaStatus)) {
          if (visa !== '_id' && visa !== '__v') {
            let document: Doc = {
              name: visa,
              url: visaStatus[visa].url || '',
              previewUrl: visaStatus[visa].previewUrl || '',
            };
            console.log('document being pushed: ', document);
            this.documents?.push(document);
            console.log('documents we get is: ', this.documents);
          }
        }
      },
      error: () => {},
    });
  }

  downloadDocument(doc: any): void {
    // Implement logic to download the document
    // This typically involves setting the window location to the document's URL
    // or creating an anchor element and triggering a click
    const link = document.createElement('a');
    link.href = doc.url;
    link.download = doc.name;
    link.click();
  }

  previewDocument(doc: any): void {
    // Implement logic to preview the document
    // This could be opening a new window or tab with the document URL
    window.open(doc.previewUrl, '_blank');
  }
}
