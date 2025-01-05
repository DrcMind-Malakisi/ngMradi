import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WindowObserverService {
  width = signal(window.innerWidth);

  constructor() {
    // ResizeObserver auto-cleanup when the DOM element is removed from the DOM
    const obs = new ResizeObserver((entries) => {
      const bboxSize = entries[0].borderBoxSize;
      this.width.set(bboxSize[0].inlineSize);
    }).observe(document.body);
  }
}
