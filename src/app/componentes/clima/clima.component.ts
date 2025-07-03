import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClimaCacheService } from './clima-cache.service';

@Component({
  selector: 'app-clima',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
    ],  // Para usar routerLink no HTML se quiser
  templateUrl: './clima.component.html',
  styleUrl: './clima.component.css'
})
export class ClimaComponent implements OnInit {
  cidade: string = '';
  clima: any = null;
  erro: string = '';
  carregando: boolean = false; // Adicionado para controle do loading

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private cache: ClimaCacheService // Injete o serviço de cache
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

  sanitizeCityName(name: string): string {
    // Remove caracteres não alfabéticos e espaços extras
    return name.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '').trim();
  }

  obterClima() {
    this.erro = '';
    this.clima = null;
    this.carregando = true;

    // Sanitização e validação da entrada
    const cidadeSanitizada = this.sanitizeCityName(this.cidade);
    if (!cidadeSanitizada || cidadeSanitizada.length < 2) {
      this.erro = 'Nome de cidade inválido.';
      this.carregando = false;
      return;
    }

    // Verifica se já existe no cache
    const cacheClima = this.cache.get(cidadeSanitizada);
    if (cacheClima) {
      this.clima = cacheClima;
      this.carregando = false;
      return;
    }

    this.http.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidadeSanitizada)}&count=1`)
      .subscribe((geo: any) => {
        if (geo.results && geo.results.length > 0) {
          const { latitude, longitude } = geo.results[0];

          this.http.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
            .subscribe((dados: any) => {
              this.clima = {
                nomeCidade: cidadeSanitizada,
                temperatura: dados.current_weather.temperature,
                vento: dados.current_weather.windspeed,
                maxima: dados.daily.temperature_2m_max[0],
                minima: dados.daily.temperature_2m_min[0]
              };
              this.cache.set(cidadeSanitizada, this.clima); // Salva no cache
              this.carregando = false;
            }, () => {
              this.erro = 'Erro ao obter clima.';
              this.carregando = false;
            });
        } else {
          this.erro = 'Cidade não encontrada.';
          this.carregando = false;
        }
      }, () => {
        this.erro = 'Erro ao buscar coordenadas.';
        this.carregando = false;
      });
  }
}
