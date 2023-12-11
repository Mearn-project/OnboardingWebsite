export type EditModeKeys =
  | 'name'
  | 'address'
  | 'contactInfo'
  | 'employment'
  | 'emergencyContact'
  | 'documents';

export interface Doc {
  name: string;
  url: string;
  previewUrl: string;
}
