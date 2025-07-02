import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { BuscaComponent } from './app/componentes/busca/busca.component';
import { ClimaComponent } from './app/componentes/clima/clima.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: BuscaComponent },
      { path: 'clima', component: ClimaComponent }
    ])
  ]
});
