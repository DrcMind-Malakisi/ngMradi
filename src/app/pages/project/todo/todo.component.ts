import { Component, inject, input, signal } from '@angular/core';
import { Task } from '../../../core/models/task.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AsyncPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { FieldValue, Timestamp } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../../core/services/firebase/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SetTodoComponent } from './set-todo.component';
import { FirestoreService } from '../../../core/services/firebase/firestore.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo',
  imports: [
    MatDividerModule,
    MatButtonModule,
    MatBadgeModule,
    UpperCasePipe,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    AsyncPipe,
    DatePipe,
  ],
  template: `
    <main>
      <div
        align="end"
        style="right : 2.7rem; top: -1.2rem"
        [matBadge]="task().priority | uppercase"
        [class.green-badge]="task().priority === 'low'"
        [class.orange-badge]="task().priority === 'medium'"
      ></div>
      <p>
        <b>{{ task().title }}</b>
      </p>
      <p>
        {{ task().description }}
      </p>
      <mat-divider />
      <p>
        {{ formatedDate(task().createdAt) | date : 'fullDate'
        }}{{ task().moved ? ' | Deplacé' : '' }}
        {{ task().updatedAt > task().createdAt ? ' | Modifié' : '' }}
      </p>
      @if (task().uid === (user$ | async)?.uid) {
      <div class="actions" align="end">
        <mat-divider />
        <button
          mat-icon-button
          matTooltip="Modifier cette tâche"
          (click)="onEditTodo(task())"
        >
          <mat-icon>edit</mat-icon>
        </button>
        <button
          mat-icon-button
          matTooltip="Supprimer cette tâche"
          (click)="onDeleteTask(task())"
        >
          <mat-icon class="alert-action">delete</mat-icon>
        </button>
      </div>
      }
    </main>
  `,
  styles: `
    p {
      padding: 0 1rem;
    }
  `,
})
export class TodoComponent {
  task = input.required<Task<Timestamp>>();
  private auth = inject(AuthService);
  private dialog = inject(MatDialog);
  private fs = inject(FirestoreService);
  private snackBar = inject(MatSnackBar);
  user$ = this.auth.user;

  formatedDate = (t?: Timestamp) => this.fs.formatedTimestamp(t);

  onEditTodo(task: Task<Timestamp>) {
    this.dialog.open(SetTodoComponent, {
      width: '35rem',
      disableClose: true,
      data: task,
    });
  }

  onDeleteTask(task: Task<Timestamp>) {
    const todoCollection = this.fs.todoCol(task.projectId!);
    this.fs.deleteData(todoCollection, task.id!);
    const message = 'Tâche suprimée avec succès';
    this.snackBar.open(message, '', { duration: 5000 });
  }
}
