import { Component, inject } from '@angular/core';
import { ProjectListComponent } from './project-list/project-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SetProjectComponent } from './set-project/set-project.component';

@Component({
  selector: 'app-project',
  imports: [ProjectListComponent, MatButtonModule],
  template: `<header
      style="display: flex; justify-content: space-between; align-items: center; margin: 0 1rem"
    >
      <h1>Projets</h1>
      <button mat-flat-button (click)="onNewProject()">Nouveau projet</button>
    </header>
    <app-project-list /> `,
  styles: ``,
})
export default class ProjectComponent {
  dialog = inject(MatDialog);

  onNewProject() {
    this.dialog.open(SetProjectComponent, {
      width: '35rem',
      disableClose: true,
    });
  }
}
