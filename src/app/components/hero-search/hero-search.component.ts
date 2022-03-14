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

  heroes: Hero[] = [];

  constructor(private heroService : HeroService) { }

  ngOnInit(): void {
  }

  search(name: string) : void {
    this.heroService.searchHeroes(name).subscribe(hero => this.heroes = hero)
  }

}
