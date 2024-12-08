import { Component, OnInit } from '@angular/core';
import { HeroData } from '../../../models/heroData';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'app-hero-portrait',
  templateUrl: './hero-portrait.component.html',
  styleUrls: ['./hero-portrait.component.css']
})
export class HeroPortraitComponent implements OnInit {
    heroes: HeroData[] = []

    constructor(private service: HeroService) { }

    ngOnInit(): void {
        this.getAllHeroes()
    }

    getAllHeroes() {
        this.service.getAllHeroes().subscribe(
            {
                next: (res: HeroData[]) => {
                    this.heroes = res                 
                },
                error: (err) => console.log('Hero not found')
            }
        )
    }
}