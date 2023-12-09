export interface Employee {
  _id: string;
  username: string;
  email: string;
  password: string;
  isHR: boolean;
  applicationStatus: string;
  feedback?: string;
  preferredName: string;
  visaStatus: string;
  application: {
    address: {
      buildingApt: string;
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    workAuthorization: string;
    cellPhone: string;
    ssn: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    preferredName?: string;
    workPhone?: string;
    email: string;
    dateOfBirth: Date | string;
    gender: string;
    isUSCitizen: boolean;
  };
  visa?: string;
  housing?: string;
}
