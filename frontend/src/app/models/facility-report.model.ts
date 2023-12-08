export class FacilityReport {
  id?: string;
  title?: string;
  description?: string;
  createdBy?: string;
  status?: 'Open' | 'In Progress' | 'Closed';
  comments?: string[];
  timestamp?: Date;

  constructor(data?: Partial<FacilityReport>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
