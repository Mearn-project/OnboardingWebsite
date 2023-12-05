export interface VisaStatus {
  employeeId: number;
  name: string;
  visaType: string;
  startDate: Date;
  endDate: Date;
  daysRemaining: number;
  currentStep: string;
}