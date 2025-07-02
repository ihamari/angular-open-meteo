import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],  // Para usar routerLink no HTML se quiser
  templateUrl: './clima.component.html',
  styleUrl: './clima.component.css'
})
export class ClimaComponent implements OnInit {
  cidade: string = '';
  clima: any = null;
  erro: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router  // Agora o Router está no construtor
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.cidade = params['cidade'];
      if (this.cidade) {
        this.obterClima();
      }
    });
  }

  voltar() {
    this.router.navigate(['/']);
  }

  obterClima() {
    this.erro = '';
    this.clima = null;

    this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=${this.cidade}&count=1`)
      .subscribe((geo: any) => {
        if (geo.results && geo.results.length > 0) {
          const { latitude, longitude } = geo.results[0];

          this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
            .subscribe((dados: any) => {
              this.clima = {
                nomeCidade: this.cidade,
                temperatura: dados.current_weather.temperature,
                vento: dados.current_weather.windspeed,
                maxima: dados.daily.temperature_2m_max[0],
                minima: dados.daily.temperature_2m_min[0]
              };
            }, () => this.erro = 'Erro ao obter clima.');
        } else {
          this.erro = 'Cidade não encontrada.';
        }
      }, () => this.erro = 'Erro ao buscar coordenadas.');
  }
}
