import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.css'
})

export class BuscaComponent {
  cidade: string = '';

  constructor(private router: Router) {}
  buscar() {
    if (this.cidade.trim()) {
      this.router.navigate(['/clima'], { queryParams: { cidade: this.cidade } });
    }
  }
}
