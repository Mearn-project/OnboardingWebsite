export interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  profilePictureUrl: string;
  cellPhone: string;
  workPhone: string;
  email: string;
  ssn: string;
  dateOfBirth: string;
  gender: string;
  isUSCitizen: boolean;
  workAuthorization: string;
  optReceiptUrl: string;
  optReceiptUrlPreview: string;
  visaTitle: string;
  startDate: string;
  endDate: string;
  hasDriverLicense: boolean;
  licenseNumber: string;
  licenseExpirationDate: string;
  licenseCopyUrl: string;
  licenseCopyUrlPreview: string;
  emergencyContacts: string[];
  address: {
    buildingApt: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  carInformation: {
    make: string;
    model: string;
    color: string;
  };
  reference: {
    firstName: string;
    lastName: string;
    middleName: string;
    phone: string;
    email: string;
    relationship: string;
  };
}
