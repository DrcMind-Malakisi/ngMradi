import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/utilities/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: [],
})
export class AppComponent {
  constructor() {
    inject(ThemeService).setupDeviceThemeListener();
  }
}
