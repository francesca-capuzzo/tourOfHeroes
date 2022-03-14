import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
 
  // heroes: Hero[] = [];
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();                               //subject è un tipo di osservabile che va a ricreare una chiamata che si ripete più volte


  constructor(private heroService : HeroService) { }

  ngOnInit(): void {

    this.heroes$ = this.searchTerms
    .pipe(
      debounceTime(300),                                                      // wait 300ms after each keystroke before considering the term -> ogni volta che l'utente scrive una lettera, aspetta 300mls prima di cercare
      distinctUntilChanged(),                                                 // ignore new term if same as previous term -> se la stessa stringa viene riscritta più volte, non rifare la chiamata
      switchMap((term: string) => this.heroService.searchHeroes(term)),       // switch to new search observable each time the term changes -> dentro un osservabile chiama un altro osservabile
    );
  }

  // search(name: string) : void {
  //   //this.heroService.searchHeroes(name).subscribe(hero => this.heroes = hero);
  // }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
