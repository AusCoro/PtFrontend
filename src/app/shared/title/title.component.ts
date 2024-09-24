import { Component } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `<h1 class="text-3xl font-bold mb-4">
    <ng-content></ng-content>
  </h1>`,
})
export class TitleComponent {}
