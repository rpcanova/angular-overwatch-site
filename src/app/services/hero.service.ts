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
        this.baseURL = environment.overFastApiHeroes
    }

    getAllHeroes(): Observable<HeroData[]> {
        return this.http.get<HeroData[]>(`${this.baseURL}`)
    }
}
