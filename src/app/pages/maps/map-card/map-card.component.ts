import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MapData } from '../../../models/mapData';
import { MapService } from '../../../services/map.service';

@Component({
    selector: 'app-map-card',
    templateUrl: './map-card.component.html',
    styleUrl: './map-card.component.css'
})
export class MapCardComponent implements OnInit, OnChanges {
    maps: MapData[] = []
    filteredMaps: MapData[] = []
    @Input() activeFilter: string = 'ALL'

    constructor(private service: MapService) { }

    ngOnInit(): void {
        this.getAllMaps()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['activeFilter']) {
            this.filterMaps()
        }
    }

    getAllMaps(): void {
        this.service.getAllMaps().subscribe(
            {
                next: (res: MapData[]) => {
                    this.maps = res
                    this.filterMaps()
                },
                error: (err) => console.log('Map not found')
            }
        )
    }

    filterMaps(): void {
        if(this.activeFilter === 'ALL') {
            this.filteredMaps = this.maps
        } else {
            this.filteredMaps = this.maps.filter(map =>
                map.gamemodes.some(gamemode =>
                    gamemode.toUpperCase() === this.activeFilter.toUpperCase()))
        }
    }
}
