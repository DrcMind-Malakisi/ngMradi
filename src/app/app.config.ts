import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  inject,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  FirebaseApp,
  getApp,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  provideFirestore,
  getFirestore,
} from '@angular/fire/firestore';
import { provideServiceWorker } from '@angular/service-worker';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID } from '@angular/core';
import {
  provideClientHydration,
  withIncrementalHydration,
} from '@angular/platform-browser';

// Register French locale
registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },

    provideAnimationsAsync(),
    provideClientHydration(withIncrementalHydration()),
    provideExperimentalZonelessChangeDetection(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ng-mradi',
        appId: '1:672557091359:web:b418da5d41d82f2458e32a',
        storageBucket: 'ng-mradi.firebasestorage.app',
        apiKey: 'AIzaSyAZari2eKoiDKc53yofCfba27V0qu_v8lM',
        authDomain: 'ng-mradi.firebaseapp.com',
        messagingSenderId: '672557091359',
      })
    ),
    provideAuth(() => getAuth(inject(FirebaseApp))),
    provideFirestore(() => getFirestore(inject(FirebaseApp))),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withComponentInputBinding()
    ), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
  ],
};
