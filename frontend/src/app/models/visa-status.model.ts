export interface VisaStatus {
  employeeId: string;
  username: string;
  email: string;
  isHR: boolean;
  applicationStatus: string;
  application: Application;
  visa: Visa;
  visaStatus: string;
}

export interface Application {
  address: Address;
  carInformation: CarInformation;
  reference: Reference;
  firstName: string;
  lastName: string;
  middleName?: string;
  preferredName?: string;
  profilePictureUrl: string;
  cellPhone: string;
  workPhone?: string;
  email: string;
  ssn: string;
  dateOfBirth: Date;
  gender: string;
  isUSCitizen: boolean;
  workAuthorization: string;
  optReceiptUrl?: string;
  optReceiptUrlPreview?: string;
  visaTitle: string;
  startDate: Date;
  endDate: Date;
  hasDriverLicense: boolean;
  licenseNumber?: string;
  licenseExpirationDate?: string;
  licenseCopyUrl?: string;
  licenseCopyUrlPreview?: string;
  emergencyContacts: string[];
}

export interface Address {
  buildingApt: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface CarInformation {
  make: string;
  model: string;
  color: string;
}

export interface Reference {
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface Visa {
  optReceipt: Document;
  optEAD: Document;
  i983: I983Document;
  i20: Document;
}

export interface Document {
  status: string;
  feedback?: string;
}

export interface I983Document extends Document {
  emptyTemplateUrl: string;
  sampleTemplateUrl: string;
}


