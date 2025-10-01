import { Component, Input, OnChanges, OnInit, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { MapData } from '../../../../models/mapData';
import { MapService } from '../../../../services/map.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-map-card',
    templateUrl: './map-card.component.html',
    styleUrls: ['./map-card.component.css', './map-card.responsive.component.css']
})
export class MapCardComponent implements OnInit, OnChanges {
    maps: MapData[] = []
    filteredMaps: MapData[] = []
    loading: boolean = true
    @Input() activeFilter: string = 'ALL'

    constructor(
        private service: MapService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        // Only load maps on browser side to avoid SSR issues
        if (isPlatformBrowser(this.platformId)) {
            this.getAllMaps()
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['activeFilter']) {
            this.filterMaps()
        }
    }

    getAllMaps(): void {
        this.loading = true
        this.service.getAllMaps().subscribe(
            {
                next: (res: MapData[]) => {
                    this.maps = res
                    this.filterMaps()
                    this.loading = false
                },
                error: (err) => {
                    console.log('Map not found')
                    this.loading = false
                }
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
