import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {
  settingsForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    // private settingsService: SettingsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      penaltyFeePerDay: [0, [Validators.required, Validators.min(0)]],
      maxBorrowingDays: [0, [Validators.required, Validators.min(1)]],
      maxBooksPerUser: [0, [Validators.required, Validators.min(1)]],
      reservationWindowDays: [0, [Validators.required, Validators.min(0)]]
    });

    this.loadSettings();
  }

  loadSettings(): void {
    // this.loading = true;
    // this.settingsService.getSettings().subscribe({
    //   next: (res) => {
    //     this.settingsForm.patchValue(res.data);
    //     this.loading = false;
    //   },
    //   error: () => {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load settings.' });
    //     this.loading = false;
    //   }
    // });
  }

  onSubmit(): void {
    // if (this.settingsForm.valid) {
    //   this.settingsService.updateSettings(this.settingsForm.value).subscribe({
    //     next: () => {
    //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Settings updated successfully.' });
    //     },
    //     error: () => {
    //       this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update settings.' });
    //     }
    //   });
    // } else {
    //   this.settingsForm.markAllAsTouched();
    // }
  }
}
