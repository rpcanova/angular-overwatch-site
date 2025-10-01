import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerData } from '../models/playerData';

@Injectable({
	providedIn: 'root',
})
export class PlayerService {
	private apiUrl = 'https://overfast-api.tekrop.fr/players';

	constructor(private http: HttpClient) {}

	getPlayerData(battletag: string): Observable<PlayerData> {
		// Encode the battletag properly for URL (replace # with %23)
		const encodedBattletag = encodeURIComponent(battletag);
		const url = `${this.apiUrl}/${encodedBattletag}`;
		console.log('API URL:', url);
		return this.http.get<PlayerData>(url);
	}

	searchPlayer(battletag: string): Observable<PlayerData> {
		return this.getPlayerData(battletag);
	}
}