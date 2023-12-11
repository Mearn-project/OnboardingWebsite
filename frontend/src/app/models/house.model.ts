export interface House {
  landlord: Landlord;
  _id: string;
  address: string;
  residents: Resident[];
  facilityReports: FacilityReport[];
  __v: number;
}

export interface Landlord {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export interface Resident {
  _id: string;
  username: string;
  email: string;
  password: string;
  isHR: boolean;
  applicationStatus: string;
  visaStatus: string;
  housing: string;
  __v: number;
}

export interface FacilityReport {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  status: string;
  comments: Comment[];
  __v: number;
}

export interface Comment {
  _id: string;
  description: string;
  createdBy: string;
  timestamp: string;
  __v: number;
}
