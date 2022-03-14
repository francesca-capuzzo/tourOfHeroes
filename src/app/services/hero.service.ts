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

  private readonly API_URL = 'https://6229de55be12fc4538aa6c8e.mockapi.io/Heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getHeroes(): Observable <Hero[]>{
    // const heroes = of(HEROES);                                   //of = funzione della libreria rxJs che trasforma gli HEROES in un Observable --> simula che HEROES arrivi da un server anche se lo abbiamo in locale (falsa chiamata Async)
    // this.messageService.add('HeroService: fetched heroes');
    // return heroes;
    //const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero[]>(this.API_URL)
    .pipe(
      tap(_ => this.log('fetched heroes')),                              //TAP: usato per fare cose che non modificano il dato --> principalmente usato per mettere dei console.log()
      catchError(this.handleError<Hero[]>('getHeroes', [])));            //vedi gestione errore nel heroes.component.ts che rimpiazzerebbe questa chiamata 
      //catchError((error) => of([]))
  }

  getHero(id: string) :Observable<Hero>{
    // const hero = HEROES.find(hero => hero.id === id)!;
    // let idS = parseInt(id)
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);

    return this.http.get<Hero>(this.API_URL + '/' + id)       //sostituisco all'URL quello montato come parametri
    .pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`)));
  }


  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  private handleError<T>(operation = 'operation', result?: T){     //T U V Z vengono usati come tipi nelle funzioni generiche -> result deve essere dello stesso tipo di quello che ho dichiarato nell'handle error
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);                                      //T nel getHero() viene inizializzato a <HERO[]>
    };
  }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };



  updateHero(hero: Hero): Observable<any>{
    return this.http.put<Hero>(this.API_URL + '/' + hero.id, hero, this.httpOptions)    //PUT -> modifica
    .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero')));
  }



  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.API_URL, hero, this.httpOptions)                  //POST -> aggiunge qualcosa di nuovo 
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }


  deleteHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(this.API_URL + '/' + id, this.httpOptions)          
    .pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  searchHeroes(name: string): Observable<Hero[]> {
    name = name.trim();
    // if (!name) {
    //   return of([]);            //se l'eroe cercato per nome non esiste, ritorna un array vuoto 
    // }
    return this.http.get<Hero[]>(this.API_URL + '?name=' + name)
    .pipe(
      tap(result => result.length ? this.log(`found heroes matching "${name}"`) : this.log(`no heroes matching "${name}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}


//service = pezzo di codice che può essere utilizzato da piu componenti