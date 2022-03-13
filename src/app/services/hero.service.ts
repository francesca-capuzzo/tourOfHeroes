import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
// import {HEROES } from '../models/mock-heroes';
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable <Hero[]>{
    // const heroes = of(HEROES);                                   //of = funzione della libreria rxJs che trasforma gli HEROES in un Observable --> simula che HEROES arrivi da un server anche se lo abbiamo in locale (falsa chiamata Async)
    // this.messageService.add('HeroService: fetched heroes');
    // return heroes;
    
    //const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero[]>('https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes')
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', [])));
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

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(tap(_ => this.log(`updated her id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero')));
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };
}


//service = pezzo di codice che può essere utilizzato da piu componenti