export type EditModeKeys =
  | 'name'
  | 'address'
  | 'contactInfo'
  | 'employment'
  | 'emergencyContact';

export interface UserInfo {
  name: {
    firstName: String;
    lastName: String;
    middleName: String;
    prefereedName: String;
  };
}
