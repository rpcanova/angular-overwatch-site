import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HeroData } from '../../../models/heroData';
import { HeroService } from '../../../services/hero.service';

@Component({
    selector: 'app-hero-card',
    templateUrl: './hero-card.component.html',
    styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit, OnChanges {
    heroes: HeroData[] = []
    filteredHeroes: HeroData[] = []
    @Input() activeFilter: string = 'ALL'

    constructor(private service: HeroService) { }

    ngOnInit(): void {
        this.getAllHeroes()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['activeFilter']) {
            this.filterHeroes()
        }
    }

    getAllHeroes(): void {
        this.service.getAllHeroes().subscribe(
            {
                next: (res: HeroData[]) => {
                    this.heroes = res
                    this.filterHeroes()
                },
                error: (err) => console.log('Hero not found')
            }
        )
    }

    filterHeroes(): void {
        if(this.activeFilter === 'ALL') {
            this.filteredHeroes = this.heroes
        } else {
            this.filteredHeroes = this.heroes.filter(hero => hero.role.toUpperCase() === this.activeFilter.toUpperCase())
        }
    }
}