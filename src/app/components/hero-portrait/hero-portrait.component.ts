import { Component, OnInit } from '@angular/core';
import { HeroData } from '../../models/heroData';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-portrait',
  templateUrl: './hero-portrait.component.html',
  styleUrl: './hero-portrait.component.css'
})
export class HeroPortraitComponent implements OnInit {
    hero: HeroData

    constructor(private service: HeroService) {
        this.hero = {
            key: '',
            name: '',
            portrait: '',
            role: ''
        }
    }

    ngOnInit(): void {
        this.getHero('ana')
    }

    getHero(searchName: string) {
        this.service.getHero(searchName).subscribe(
            {
                next: (res) => {
                    this.hero = {
                        key: res.key,
                        name: res.name,
                        portrait: res.portrait,
                        role: res.role
                    }
                },
                error: (err) => console.log('not found')
            }
        )
    }
}
