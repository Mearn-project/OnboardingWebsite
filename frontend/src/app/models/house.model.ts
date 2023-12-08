export class House {
  id?: string;
  address?: string;
  landlord?: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  };
  residents?: string[];
  facilityReports?: string[];

  constructor(data?: Partial<House>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}

