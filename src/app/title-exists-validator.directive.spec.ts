import { TitleExistsValidatorDirective, titleExistsValidator } from './title-exists-validator.directive';
import { AbstractControl, FormControl } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('TitleExistsValidatorDirective', () => {
  let existingTitles: string[];

  beforeEach(() => {
    // Set the existing titles array
    existingTitles = ['Task 1', 'Task 2', 'Test Task'];
  });

  it('should create an instance of the directive', () => {
    const directive = new TitleExistsValidatorDirective();
    expect(directive).toBeTruthy();
  });

  it('should return null if title is unique and valid', () => {
    const control = new FormControl('New Task');
    const result = titleExistsValidator(existingTitles)(control);

    expect(result).toBeNull(); // No error should be returned for valid unique title
  });

  it('should return error if title already exists', () => {
    const control = new FormControl('Task 1');
    const result = titleExistsValidator(existingTitles)(control);

    expect(result).toEqual({ titleExists: true }); // Error if title exists in existingTitles
  });

  it('should return error for invalid characters in title', () => {
    const control = new FormControl('Invalid!Task');
    const result = titleExistsValidator(existingTitles)(control);

    expect(result).toEqual({ invalidCharacters: true }); // Error for invalid characters
  });

  it('should return null for title with valid characters but unique', () => {
    const control = new FormControl('Valid Task');
    const result = titleExistsValidator(existingTitles)(control);

    expect(result).toBeNull(); // No error for valid title without existing match
  });

  it('should handle case-insensitivity when checking for existing title', () => {
    const control = new FormControl('test task');
    const result = titleExistsValidator(existingTitles)(control);

    expect(result).toEqual({ titleExists: true }); // Case-insensitive check for title existence
  });
});
