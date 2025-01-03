import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css', './heroes.responsive.component.css']
})
export class HeroesComponent implements OnInit {
    selectedFilter: string = 'ALL'

    constructor() { }

    ngOnInit(): void {
    }

    handleFilterChange(filter: string) {
        this.selectedFilter = filter
    }
}