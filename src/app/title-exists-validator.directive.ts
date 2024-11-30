import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export function titleExistsValidator(existingTitles: string[]) {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputTitle = control.value?.trim().toLowerCase();
    existingTitles = existingTitles.map(title => title.toLowerCase());
    if (existingTitles.includes(inputTitle)) {
      return { titleExists: true }; // Custom error key
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

