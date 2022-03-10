import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
// import {HEROES } from '../models/mock-heroes';
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable <Hero[]>{
    // const heroes = of(HEROES);                                   //of = funzione della libreria rxJs che trasforma gli HEROES in un Observable --> simula che HEROES arrivi da un server anche se lo abbiamo in locale (falsa chiamata Async)
    // this.messageService.add('HeroService: fetched heroes');
    // return heroes;
    return this.http.get<Hero[]>('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes');
  }

  getHero(id: string) :Observable<Hero>{
    // const hero = HEROES.find(hero => hero.id === id)!;
    // let idS = parseInt(id)
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);
    return this.http.get<Hero>('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes/' + id);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}


//service = pezzo di codice che può essere utilizzato da piu componenti