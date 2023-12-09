export class Comment {
  id?: string;
  description?: string;
  createdBy?: string;
  timestamp?: Date;

  constructor(data?: Partial<Comment>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}