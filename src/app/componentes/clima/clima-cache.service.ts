import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClimaCacheService {
  private cache = new Map<string, any>();

  get(cidade: string): any | null {
    return this.cache.get(cidade) || null;
  }

  set(cidade: string, dados: any): void {
    this.cache.set(cidade, dados);
  }
}
