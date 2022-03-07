import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import {HEROES } from '../models/mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Hero[]{
    return HEROES;
  }
}


//pezzo di codice che può essere utilizzato da piu componenti