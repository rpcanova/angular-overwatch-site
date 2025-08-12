import { Injectable } from '@angular/core';
import { HeroData } from '../models/heroData';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeroService {
    private baseURL: string = ""

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.overFastApiHeroes
    }

    getAllHeroes(): Observable<HeroData[]> {
        return this.http.get<HeroData[]>(`${this.baseURL}`)
    }

    getHeroByKey(key: string): Observable<HeroData> {
        return this.http.get<HeroData>(`${this.baseURL}${key}`)
    }
}
