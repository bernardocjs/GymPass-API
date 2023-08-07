export class LimitNumberOfCheckInsError extends Error {
  constructor() {
    super('Max number of checkIns reached');
    this.name = 'LimitNumberOfCheckInsError';
  }
    
}