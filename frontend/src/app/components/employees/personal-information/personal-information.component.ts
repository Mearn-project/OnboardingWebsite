import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Employee } from 'src/app/models/employee.model';
import { UserService } from 'src/app/services/user.service';
import { EditModeKeys } from 'src/app/models/personal-info.model';

@Component({
  selector: 'employee-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss',
})
export class PersonalInformationComponent implements OnInit {
  userData?: Employee;
  personalInfoForm: FormGroup;
  nameForm: FormGroup;
  editMode: { [key in EditModeKeys]: boolean } = {
    name: false,
    address: false,
    contactInfo: false,
    employment: false,
    emergencyContact: false,
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public userService: UserService
  ) {
    this.personalInfoForm = new FormGroup({});
    this.nameForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserInfo();
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
    const userId = '656f827400e1e8b8ebad973a';
    this.userService.getUserInfo().subscribe(
      (data) => {
        console.log(data);
        this.personalInfoForm.patchValue({
          name: {
            firstName: data.application.firstName,
            lastName: data.application.lastName,
            middleName: data.application.middleName,
            preferredName: data.application.preferredName,
          },
          // address: {
          //   building: data.application.,
          //   street: [''],
          //   city: [''],
          //   state: [''],
          //   zip: [''],
          // },
        });
        this.userData = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
    // should match this:
    // this.userData = {
    //   name: { firstName: 'John', lastName: 'Doe' /* ... */ },
    //   address: { building: '123', street: 'Main St' /* ... */ },
    //   // ... other sections
    //   documents: [{ name: 'Document1.pdf' }, { name: 'Document2.pdf' }],
    // };
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
  }

  save(section: EditModeKeys): void {
    console.log('infoForm data: ', this.personalInfoForm);
    const sectionGroup = this.personalInfoForm.get(section);
    const formData = new FormData();
    for (const controlName of Object.keys(sectionGroup?.value)) {
      console.log('control Name: ', controlName);
      console.log('value: ', sectionGroup?.value.controlName);
      formData.append(controlName, sectionGroup?.value.controlName);
    }
    console.log('raw value: ', sectionGroup?.value);
    console.log('form data: ', formData);
    if (sectionGroup?.valid) {
      this.userService.updateSection(section, sectionGroup.value).subscribe(
        () => {
          // Handle the successful response here, e.g., showing a success message
          console.log('Update successful');
          this.editMode[section] = false;
        },
        () => {
          // Handle errors here, e.g., showing an error message
          console.error('Update failed');
        }
      );
    }
    this.editMode[section] = false;
  }

  cancel(section: EditModeKeys): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Discard all changes?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'yes') {
        console.log('returned yes');
        // TODO: reset initial data
        this.initializeForm(); // Reset form with initial data
        this.editMode[section] = false;
      }
    });
    // Implement logic to reset the form or reload original data
    this.editMode[section] = false;
  }
}
