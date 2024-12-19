import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { MapData } from '../models/mapData';

@Injectable({
    providedIn: 'root'
})
export class MapService {
    private baseURL: string = ""
    constructor(private http: HttpClient) {
        this.baseURL = environment.overFastApiMaps
    }

    getAllMaps(): Observable<MapData[]> {
        return this.http.get<MapData[]>(`${this.baseURL}`)
    }
}