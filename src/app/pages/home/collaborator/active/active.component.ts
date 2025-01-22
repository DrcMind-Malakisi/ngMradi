import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FirestoreService } from '../../../../core/services/firebase/firestore.service';
import { Subscription, Observable, switchMap } from 'rxjs';
import { Project } from '../../../../core/models/project.model';
import { AuthService } from '../../../../core/services/firebase/auth.service';
import { Timestamp } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-active',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    AsyncPipe,
  ],
  template: `
    <main style="margin:1rem">
      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input
          matInput
          (keyup)="applyFilter($event)"
          placeholder="Ex. Création d'un site web"
          #input
        />
      </mat-form-field>
      <div class="table-container">
        <table mat-table [dataSource]="dataSource" matSort>
          <!-- Position Column -->
          <ng-container matColumnDef="position">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>N°</th>
            <td mat-cell *matCellDef="let project">
              {{ dataSource.filteredData.indexOf(project) + 1 }}
            </td>
          </ng-container>

          <!-- Title Column -->
          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Titre</th>
            <td mat-cell *matCellDef="let project">{{ project.title }}</td>
          </ng-container>

          <!-- Possession Column -->
          <ng-container matColumnDef="possession">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Possession
            </th>
            <td mat-cell *matCellDef="let project">
              {{
                project.uid === (user$ | async)?.uid
                  ? 'Proprietaire'
                  : 'Contributeur'
              }}
            </td>
          </ng-container>

          <!-- Contributors Column -->
          <ng-container matColumnDef="contributors">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>
              Contributeurs
            </th>
            <td mat-cell *matCellDef="let project">
              {{ project.contributors?.length ?? 0 }}
            </td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef mat-sort-header></th>
            <td mat-cell *matCellDef="let project">
              <button mat-icon-button><mat-icon>edit</mat-icon></button>
              <button mat-icon-button><mat-icon>delete</mat-icon></button>
            </td>
          </ng-container>

          <tr
            mat-header-row
            *matHeaderRowDef="displayedColumns"
            style="font-weight: bolder"
          ></tr>
          <tr mat-row *matRowDef="let project; columns: displayedColumns"></tr>

          <!-- Row shown when there is no matching data. -->
          <tr class="mat-row" *matNoDataRow>
            <td class="mat-cell" colspan="5" align="center">
              Aucune donnée à afficher
            </td>
          </tr>
        </table>
        <mat-divider />
        <mat-paginator
          [pageSizeOptions]="[5, 10, 25, 100]"
          aria-label="Séléctionnez la page des projets"
        ></mat-paginator>
      </div>
    </main>
  `,
  styles: `
    main {
      border: 1px solid var(--mat-sys-outline);
      border-radius: 4px;

      mat-divider {
        border-top-color: var(--mat-sys-outline) !important;
      }
    }
  
  `,
})
export default class ActiveComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  displayedColumns: string[] = [
    'position',
    'title',
    'possession',
    'contributors',
    'action',
  ];
  dataSource = new MatTableDataSource<Project<Timestamp>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private fs = inject(FirestoreService);
  private auth = inject(AuthService);
  user$ = this.auth.user;
  userSub?: Subscription;
  projects$?: Observable<Project<Timestamp>[]>;

  ngOnInit() {
    this.userSub = this.user$
      .pipe(switchMap((user) => this.fs.getProjects(user!)))
      .subscribe((projects) => {
        this.dataSource.data = projects as Project<Timestamp>[];
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
