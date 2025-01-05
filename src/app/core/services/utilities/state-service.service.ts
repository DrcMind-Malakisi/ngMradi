import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateServiceService {
  isToggleDrawer = signal(false);
}
