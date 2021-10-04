import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spiner.service';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="loading-indicator" *ngIf="isLoading$ | async">
      <mat-progress-spinner
        mode="indeterminate"
        color="accent"
      ></mat-progress-spinner>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  isLoading$ = this.spinnerSrv.isLoading$;
  constructor(private spinnerSrv: SpinnerService) {}
}
