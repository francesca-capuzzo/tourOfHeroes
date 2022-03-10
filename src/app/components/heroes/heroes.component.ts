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
  }
}
