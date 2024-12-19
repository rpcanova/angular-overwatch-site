import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit {
    selectedFilter: string = 'ALL'

    constructor() { }

    ngOnInit(): void {
    }

    handleFilterChange(filter: string) {
        this.selectedFilter = filter
    }
}
