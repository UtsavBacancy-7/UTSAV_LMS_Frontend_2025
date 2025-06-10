import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {
  public static noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }

  public static nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!value) return { required: true };
    if (!isNaN(value)) return { onlyNumber: true };
    if (!nameRegex.test(value)) return { invalidName: true };

    return null;
  }

  public static emailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) return { required: true };
    if (!emailRegex.test(value)) return { invalidEmail: true };

    return null;
  }

  public static passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*@)[A-Za-z\d@]{6,12}$/;

    if (!value) return { required: true };
    if (!passwordRegex.test(value)) return { invalidPassword: true };

    return null;
  }
}
