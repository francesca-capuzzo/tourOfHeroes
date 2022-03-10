import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  // @Input() hero?: Hero;

  hero: Hero | undefined;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero():void{
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.heroService.getHero(id).subscribe(hero => {
        if(hero) {
          this.hero = hero
        }
      }); 
    }
  }

  goBack() : void{
    this.location.back();
  }

}
