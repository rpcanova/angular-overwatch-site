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
    private heroData: HeroData | any

    constructor(
        private http: HttpClient
    ) {
        this.baseURL = environment.overFastApi
    }

    getAllHeroes(): Observable<HeroData[]> {
        this.heroData = this.http.get<HeroData[]>(`${this.baseURL}`)

        return this.heroData
    }
}
