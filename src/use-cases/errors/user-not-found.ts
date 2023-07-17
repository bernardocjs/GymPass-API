export class UserNotFound extends Error {
  constructor() {
    super('E-mail not found');
    this.name = 'UserNotFound';
  }
}
