import { Component } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { SideNavComponent } from './side-nav.component';
import { MatDividerModule } from '@angular/material/divider';
import { APP_NAME } from '../../app.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ToolbarComponent, SideNavComponent, MatDividerModule],
  template: `
    <app-toolbar />
    <mat-divider />
    <app-side-nav />
  `,
  styles: `
  `,
})
export default class HomeComponent {
  appName = APP_NAME;
}
