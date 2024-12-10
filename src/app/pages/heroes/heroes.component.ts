import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
    selectedFilter: string = 'ALL'

    constructor() { }

    ngOnInit(): void {
        console.log("Initial activeFilter:", this.selectedFilter)
    }

    handleFilterChange(filter: string) {
        console.log('Filter selected:', filter)
        this.selectedFilter = filter
    }
}