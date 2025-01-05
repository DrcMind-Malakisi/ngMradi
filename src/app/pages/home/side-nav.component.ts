import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IS_MEDIUM } from '../../app.constants';
import { StateServiceService } from '../../core/services/utilities/state-service.service';
import { WindowObserverService } from '../../core/services/utilities/windows-observer.service';

@Component({
  selector: 'app-side-nav',
  imports: [
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <mat-drawer-container autosize>
      <mat-drawer
        #drawer
        [mode]="viewPoint() >= isMedium ? 'side' : 'over'"
        [opened]="viewPoint() >= isMedium || isToggleDrawer()"
        class="drawer-sidenav"
      >
        <a
          mat-menu-item
          routerLink="/projects"
          routerLinkActive="active-link"
          (click)="toggleDrawer()"
        >
          <mat-icon>dataset</mat-icon>
          <span> Projets </span>
        </a>
        <a
          mat-menu-item
          routerLink="/contributors"
          routerLinkActive="active-link"
          (click)="toggleDrawer()"
        >
          <mat-icon>group</mat-icon>
          <span> Contributeurs </span>
        </a>
      </mat-drawer>

      <mat-drawer-content class="sidenav-content"
        ><router-outlet
      /></mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: `
    mat-drawer-container {
      height: calc(100vh - 65px);
      display: flex;
      flex-direction: column;
    }
    
    mat-drawer {
      width: 220px;
      border-right: 1px solid var(--mat-sys-outline-variant);
      border-radius: 0%;
    }
    
    .active-link {
      background: var(--mat-sys-outline-variant);
    }
  `,
})
export class SideNavComponent {
  isMedium = IS_MEDIUM;
  private state = inject(StateServiceService);
  viewPoint = inject(WindowObserverService).width;
  toggleDrawer = () => this.state.isToggleDrawer.update((value) => !value);
  isToggleDrawer = computed(() => this.state.isToggleDrawer());
}
