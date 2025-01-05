import { Routes } from '@angular/router';
import { APP_NAME } from './app.constants';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

export const routes: Routes = [
  {
    path: 'login',
    title: `Login - ${APP_NAME}`,
    loadComponent: () => import('./pages/login/login.component'),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component'),
    ...canActivate(redirectUnauthorizedToLogin),
    children: [
      {
        path: 'projects',
        title: `Projets - ${APP_NAME}`,
        loadComponent: () => import('./pages/home/project/project.component'),
      },
      {
        path: 'contributors',
        title: `Contributeurs - ${APP_NAME}`,
        loadComponent: () =>
          import('./pages/home/collaborator/collaborator.component'),
        children: [
          {
            path: 'active',
            title: `Contributeurs actifs - ${APP_NAME}`,
            loadComponent: () =>
              import('./pages/home/collaborator/active/active.component'),
          },
          {
            path: 'achived',
            title: `Contributeurs archivés - ${APP_NAME}`,
            loadComponent: () =>
              import('./pages/home/collaborator/achived/achived.component'),
          },
          {
            path: '',
            redirectTo: 'active',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'project/:id',
    title: `Chargement du projet... - ${APP_NAME}`,
    loadComponent: () => import('./pages/project/project.component'),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
