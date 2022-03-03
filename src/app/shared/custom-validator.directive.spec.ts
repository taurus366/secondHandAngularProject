import { EmailValidatorDirective } from './email-validator.directive';

describe('CustomValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new EmailValidatorDirective();
    expect(directive).toBeTruthy();
  });
});
