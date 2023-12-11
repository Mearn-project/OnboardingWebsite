export interface EmployeeVisaStatus {
  optReceipt: {
    status: string;
    statusMessage: string;
    feedback: string;
    isVisible: Boolean;
  };
  optEAD: {
    status: string;
    statusMessage: string;
    feedback: string;
    isVisible: Boolean;
  };
  i983: {
    status: string;
    statusMessage: string;
    feedback: string;
    isVisible: Boolean;
  };
  i20: {
    status: string;
    statusMessage: string;
    feedback: string;
    isVisible: Boolean;
  };
}
