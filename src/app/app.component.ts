import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Isso resolve o problema
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'angular-open-meteo';
}
