export interface TokenHistoryResponse {
  allEmails: {
    _id: string;
    email: string;
    status: string;
  }[];
}
