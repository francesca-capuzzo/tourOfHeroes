import { Component, OnInit } from '@angular/core';
import {Hero} from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})

export class HeroesComponent implements OnInit {
  
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // }


  // selectedHero?: Hero;

  heroes: Hero[] = [];
  

  constructor(private heroService: HeroService, private messageService: MessageService) {  //dico al costruttore che ha una variabile in input di tipo 'heroService' --> i componenti non vengono creati da noi ma dal framework

  } 
  
  
  ngOnInit(): void {
    this.getHeroes();
  }


  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero name=${hero.name}`)
  // }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    //this.heroService.getHeroes().subscribe({next: heroes => this.heroes = heroes, error: err=> console.log(err)});              //gestione dell'errore nel componente anzichè nel servizio!!!!
  }


  add(name: string): void {
    name = name.trim();                              //controlla che il name non abbia spazi in cima e infondo
    if (name) { 
      this.heroService.addHero({ name } as Hero)     //passa un oggetto che vuole che sia un eroe (name di tipi HERO)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
     }
  }

  delete(hero: Hero): void {
    if (this.heroes) {
      this.heroes = this.heroes.filter(h => h !== hero);
      this.heroService.deleteHero(hero.id).subscribe();
    }
  }
}
