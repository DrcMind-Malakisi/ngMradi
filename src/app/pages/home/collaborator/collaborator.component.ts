import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user',
  imports: [MatTabsModule, RouterLink, RouterOutlet, MatDividerModule],
  template: `
    <header>
      <h1 style="margin-left: 1rem;">Contributeurs</h1>
    </header>
    <mat-divider />
    <main class="children-container">
      <nav mat-tab-nav-bar mat-stretch-tabs="false" [tabPanel]="tabPanel">
        @for (link of links; track $index) {
        <a
          mat-tab-link
          (click)="activeLink = link.url"
          [active]="activeLink === link.url"
          [routerLink]="link.url"
        >
          {{ link.name }}
        </a>
        }
      </nav>
      <mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: ``,
})
export default class UserComponent {
  links = [
    {
      name: 'Actifs',
      url: 'active',
    },
    {
      name: 'Archivés',
      url: 'achived',
    },
  ];

  private router = inject(Router);
  activeLink = this.router.url.replace(`/contributors/`, '');
}
