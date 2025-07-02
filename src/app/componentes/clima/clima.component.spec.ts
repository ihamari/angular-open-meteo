import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClimaComponent } from './clima.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClimaComponent', () => {
  let component: ClimaComponent;
  let fixture: ComponentFixture<ClimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimaComponent, RouterTestingModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ClimaComponent); // Cria o componente para teste
    component = fixture.componentInstance;             // Instância do componente
    fixture.detectChanges();                           // Dispara o ciclo de vida do Angular
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  // ...outros testes unitários...
});
