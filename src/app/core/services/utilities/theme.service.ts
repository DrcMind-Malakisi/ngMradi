import { Injectable, signal, computed, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type ThemeMode = 'light-theme' | 'dark-theme' | 'device-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private themeSignal = signal<ThemeMode>(this.getInitialTheme());
  public theme = computed(() => this.themeSignal());

  constructor() {
    effect(() => this.handleThemeChange(this.themeSignal()));
    this.setupDeviceThemeListener();
  }

  private getInitialTheme(): ThemeMode {
    return (localStorage.getItem('theme') as ThemeMode) || 'device-theme';
  }

  private handleThemeChange(theme: ThemeMode) {
    if (theme === 'device-theme') {
      this.applyDeviceTheme();
    } else {
      this.applyTheme(theme);
    }
    localStorage.setItem('theme', theme);
  }

  private applyTheme(theme: ThemeMode) {
    const isDark = theme === 'dark-theme';
    this.document.body.classList.toggle('dark-theme', isDark);
  }

  private applyDeviceTheme() {
    const isLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    this.document.body.classList.toggle('dark-theme', !isLight);
  }

  setupDeviceThemeListener() {
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', (e) => {
        if (this.themeSignal() === 'device-theme') {
          this.applyDeviceTheme();
        }
      });
  }

  setTheme(theme: ThemeMode) {
    this.themeSignal.set(theme);
  }
}
