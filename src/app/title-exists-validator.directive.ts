import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export function titleExistsValidator(existingTitles: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputTitle = control.value?.trim().toLowerCase();
    // Check for special characters other than '-', '_', and space
    const invalidCharacters = /[^a-zA-Z0-9 _-]/;
    if (invalidCharacters.test(inputTitle)) {
      return { invalidCharacters: true }; // Custom error for invalid characters
    }

    existingTitles = existingTitles.map(title => title.toLowerCase());
    if (existingTitles.includes(inputTitle)) {
      return { titleExists: true }; // Custom error key for existing title in database
    }
    
    return null; // No error
  };
}

@Directive({
  selector: '[appTitleExistsValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TitleExistsValidatorDirective,
      multi: true,
    },
  ],
})

export class TitleExistsValidatorDirective implements Validator {
  @Input('appTitleExistsValidator') existingTitles: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    return titleExistsValidator(this.existingTitles)(control);
  }
}

