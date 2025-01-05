import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-login-skelton',
  imports: [MatDividerModule],
  template: `
    <div class="skeleton-form" style="padding: 1rem 0;">
      <div class="skeleton skeleton-shapes"></div>
      <br />
      <mat-divider />
      <br />
      <div class="skeleton skeleton-shapes"></div>
      <br />
      <div class="skeleton skeleton-button"></div>
    </div>
  `,
  styles: `
/* Specific skeleton shapes */
.skeleton-shapes{
  height: 40px;
  width: 100%;
}

.skeleton-button {
  height: 40px;
  width: 100px;
  place-self: end;
} 
  `,
})
export class LoginSkeltonComponent {}
