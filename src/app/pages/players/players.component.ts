import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { HeroService } from '../../services/hero.service';
import { PlayerData, HeroComparison, HeroValue } from '../../models/playerData';
import { HeroData } from '../../models/heroData';
import { Subscription, timeout, catchError, of } from 'rxjs';

@Component({
	selector: 'app-players',
	templateUrl: './players.component.html',
	styleUrl: './players.component.css',
})
export class PlayersComponent implements OnInit, OnDestroy {
	searchInput: string = '';
	player: PlayerData | null = null;
	loading: boolean = false;
	error: boolean = false;
	errorMessage: string = '';
	activeTab: string = 'all';
	currentTime: string = '';
	isSearchPage: boolean = true;
	heroes: HeroData[] = [];
	selectedPlatform: 'all' | 'pc' | 'console' = 'all';
	selectedMode: 'quickplay' | 'competitive' = 'quickplay';
	selectedComparisonType: 'time_played' | 'games_won' | 'win_percentage' = 'time_played';
	
	private timeInterval: any;
	private routeSubscription: Subscription | null = null;

	constructor(
		private playerService: PlayerService,
		private heroService: HeroService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.updateTime();
		this.timeInterval = setInterval(() => this.updateTime(), 1000);
		
		// Load heroes data for images
		this.loadHeroes();
		
		// Check if we're on a specific player route
		this.routeSubscription = this.route.params.subscribe(params => {
			const battletag = params['battletag'];
			
			if (battletag) {
				this.isSearchPage = false;
				// Convert back from URL format (RafaelCnv-1407) to BattleTag format (RafaelCnv#1407)
				const convertedBattletag = battletag.replace('-', '#');
				this.searchInput = convertedBattletag;
				this.searchPlayer(convertedBattletag);
			} else {
				this.isSearchPage = true;
			}
		});
	}

	ngOnDestroy(): void {
		if (this.timeInterval) {
			clearInterval(this.timeInterval);
		}
		if (this.routeSubscription) {
			this.routeSubscription.unsubscribe();
		}
	}

	updateTime(): void {
		const now = new Date();
		this.currentTime = now.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		});
	}

	searchPlayer(battletag?: string): void {
		const searchTerm = battletag || this.searchInput;
		
		if (!searchTerm.trim()) {
			this.showError('Please enter a BattleTag');
			return;
		}

		// Validate BattleTag format (Username#12345)
		const battletagRegex = /^[a-zA-Z0-9]+#[0-9]{4,5}$/;
		if (!battletagRegex.test(searchTerm)) {
			this.showError('Invalid BattleTag format. Use: Username#1234 or Username#12345');
			return;
		}

		this.loading = true;
		this.error = false;
		this.player = null;

		// Add timeout and error handling to prevent infinite loading
		this.playerService.searchPlayer(searchTerm)
			.pipe(
				timeout(15000), // 15 second timeout
				catchError((err) => {
					console.error('API error:', err);
					this.loading = false;
					if (err.name === 'TimeoutError') {
						this.showError('Request timed out. Please try again.');
					} else {
						this.showError('Player not found or profile is private');
					}
					return of(null);
				})
			)
			.subscribe({
				next: (data: PlayerData | null) => {
					if (data) {
						this.player = data;
						this.loading = false;
						
						// Only redirect if we're on the search page and player was found successfully
						if (this.isSearchPage && data && data.summary) {
							const playerRoute = searchTerm.replace('#', '-');
							this.router.navigate(['/players', playerRoute]);
						}
					}
				}
			});
	}

	showError(message: string): void {
		this.error = true;
		this.errorMessage = message;
	}

	clearError(): void {
		this.error = false;
		this.errorMessage = '';
	}

	setActiveTab(tab: string): void {
		this.activeTab = tab;
	}

	setPlatform(platform: string): void {
		this.selectedPlatform = platform as 'all' | 'pc' | 'console';
	}

	setMode(mode: string): void {
		this.selectedMode = mode as 'quickplay' | 'competitive';
	}

	setComparisonType(type: string): void {
		this.selectedComparisonType = type as 'time_played' | 'games_won' | 'win_percentage';
	}

	getComparisonData(): HeroValue[] {
		if (!this.player?.stats) return [];

		switch (this.selectedPlatform) {
			case 'pc':
				return this.player.stats.pc?.[this.selectedMode]?.heroes_comparisons?.[this.selectedComparisonType]?.values || [];
			case 'console':
				return this.player.stats.console?.[this.selectedMode]?.heroes_comparisons?.[this.selectedComparisonType]?.values || [];
			case 'all':
			default:
				// Combine PC and Console data
				const pcData = this.player.stats.pc?.[this.selectedMode]?.heroes_comparisons?.[this.selectedComparisonType]?.values || [];
				const consoleData = this.player.stats.console?.[this.selectedMode]?.heroes_comparisons?.[this.selectedComparisonType]?.values || [];
				
				// Merge data by hero name
				const combinedData: { [key: string]: HeroValue } = {};
				
				// Add PC data
				pcData.forEach(hero => {
					combinedData[hero.hero] = { ...hero };
				});
				
				// Add Console data (sum if hero already exists)
				consoleData.forEach(hero => {
					if (combinedData[hero.hero]) {
						combinedData[hero.hero].value += hero.value;
					} else {
						combinedData[hero.hero] = { ...hero };
					}
				});
				
				return Object.values(combinedData);
		}
	}

	formatTime(seconds: number): string {
		if (!seconds || seconds === 0) return '0 HRS';

		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);

		if (hours > 0) {
			return `${hours} HRS`;
		} else if (minutes > 0) {
			return `${minutes} MINS`;
		} else {
			return `${seconds} SECS`;
		}
	}

	formatComparisonValue(value: number): string {
		switch (this.selectedComparisonType) {
			case 'time_played':
				return this.formatTime(value);
			case 'games_won':
				return `${value} GAMES`;
			case 'win_percentage':
				return `${value.toFixed(1)}%`;
			default:
				return value.toString();
		}
	}

	getTopHeroes(limit: number): HeroValue[] {
		const data = this.getComparisonData();
		if (!data) {
			return [];
		}
		
		return data
			.sort((a: HeroValue, b: HeroValue) => b.value - a.value)
			.slice(0, limit);
	}

	getHeroPercentage(value: number): number {
		const data = this.getComparisonData();
		if (!data || data.length === 0) {
			return 0;
		}
		
		const maxValue = Math.max(...data.map((h: HeroValue) => h.value));
		return maxValue > 0 ? (value / maxValue) * 100 : 0;
	}

	getTotalTimePlayed(): number {
		const timePlayedData = this.getTimePlayedData();
		if (!timePlayedData) return 0;
		
		return timePlayedData.reduce((total: number, hero: HeroValue) => total + hero.value, 0);
	}

	getTotalTimePlayedForMode(mode: 'quickplay' | 'competitive'): number {
		const data = this.getTimePlayedData(mode);
		if (!data) return 0;
		return data.reduce((total: number, hero: HeroValue) => total + hero.value, 0);
	}

	getTimePlayedData(mode: 'quickplay' | 'competitive' = this.selectedMode): HeroValue[] {
		if (!this.player?.stats) return [];

		switch (this.selectedPlatform) {
			case 'pc':
				return this.player.stats.pc?.[mode]?.heroes_comparisons?.time_played?.values || [];
			case 'console':
				return this.player.stats.console?.[mode]?.heroes_comparisons?.time_played?.values || [];
			case 'all':
			default:
				// Combine PC and Console data
				const pcData = this.player.stats.pc?.[mode]?.heroes_comparisons?.time_played?.values || [];
				const consoleData = this.player.stats.console?.[mode]?.heroes_comparisons?.time_played?.values || [];
				
				// Merge data by hero name
				const combinedData: { [key: string]: HeroValue } = {};
				
				// Add PC data
				pcData.forEach(hero => {
					combinedData[hero.hero] = { ...hero };
				});
				
				// Add Console data (sum if hero already exists)
				consoleData.forEach(hero => {
					if (combinedData[hero.hero]) {
						combinedData[hero.hero].value += hero.value;
					} else {
						combinedData[hero.hero] = { ...hero };
					}
				});
				
				return Object.values(combinedData);
		}
	}

	getHeroTimePlayed(heroName: string): number {
		const timePlayedData = this.getTimePlayedData();
		if (!timePlayedData) return 0;
		
		const hero = timePlayedData.find((h: HeroValue) => h.hero === heroName);
		return hero ? hero.value : 0;
	}

	getGamesWonData(mode: 'quickplay' | 'competitive' = this.selectedMode): HeroValue[] {
		if (!this.player?.stats) return [];

		switch (this.selectedPlatform) {
			case 'pc':
				return this.player.stats.pc?.[mode]?.heroes_comparisons?.games_won?.values || [];
			case 'console':
				return this.player.stats.console?.[mode]?.heroes_comparisons?.games_won?.values || [];
			case 'all':
			default:
				// Combine PC and Console data
				const pcData = this.player.stats.pc?.[mode]?.heroes_comparisons?.games_won?.values || [];
				const consoleData = this.player.stats.console?.[mode]?.heroes_comparisons?.games_won?.values || [];
				
				// Merge data by hero name
				const combinedData: { [key: string]: HeroValue } = {};
				
				// Add PC data
				pcData.forEach(hero => {
					combinedData[hero.hero] = { ...hero };
				});
				
				// Add Console data (sum if hero already exists)
				consoleData.forEach(hero => {
					if (combinedData[hero.hero]) {
						combinedData[hero.hero].value += hero.value;
					} else {
						combinedData[hero.hero] = { ...hero };
					}
				});
				
				return Object.values(combinedData);
		}
	}

	getHeroGamesWon(heroName: string): number {
		const gamesWonData = this.getGamesWonData();
		if (!gamesWonData) return 0;
		
		const hero = gamesWonData.find((h: HeroValue) => h.hero === heroName);
		return hero ? hero.value : 0;
	}

	getRoleTimePlayed(role: string): number {
		const timePlayedData = this.getTimePlayedData(this.selectedMode);
		if (!timePlayedData || !this.heroes.length) return 0;
		
		// Get heroes by role from API data
		const heroesInRole = this.heroes
			.filter(hero => hero.role.toLowerCase() === role.toLowerCase())
			.map(hero => hero.key);
		
		return timePlayedData
			.filter(hero => heroesInRole.includes(hero.hero))
			.reduce((total, hero) => total + hero.value, 0);
	}

	getRoleGamesWon(role: string): number {
		const gamesWonData = this.getGamesWonData(this.selectedMode);
		if (!gamesWonData || !this.heroes.length) return 0;
		
		// Get heroes by role from API data
		const heroesInRole = this.heroes
			.filter(hero => hero.role.toLowerCase() === role.toLowerCase())
			.map(hero => hero.key);
		
		return gamesWonData
			.filter(hero => heroesInRole.includes(hero.hero))
			.reduce((total, hero) => total + hero.value, 0);
	}

	getWinrateData(): HeroValue[] {
		if (!this.player?.stats) return [];

		switch (this.selectedPlatform) {
			case 'pc':
				return this.player.stats.pc?.[this.selectedMode]?.heroes_comparisons?.win_percentage?.values || [];
			case 'console':
				return this.player.stats.console?.[this.selectedMode]?.heroes_comparisons?.win_percentage?.values || [];
			case 'all':
			default:
				// Combine PC and Console data
				const pcData = this.player.stats.pc?.[this.selectedMode]?.heroes_comparisons?.win_percentage?.values || [];
				const consoleData = this.player.stats.console?.[this.selectedMode]?.heroes_comparisons?.win_percentage?.values || [];
				
				// Merge data by hero name
				const combinedData: { [key: string]: HeroValue } = {};
				
				// Add PC data
				pcData.forEach(hero => {
					combinedData[hero.hero] = { ...hero };
				});
				
				// Add Console data (sum if hero already exists)
				consoleData.forEach(hero => {
					if (combinedData[hero.hero]) {
						combinedData[hero.hero].value += hero.value;
					} else {
						combinedData[hero.hero] = { ...hero };
					}
				});
				
				return Object.values(combinedData);
		}
	}

	getHeroWinrate(heroName: string): number {
		const winrateData = this.getWinrateData();
		if (!winrateData) return 0;
		
		const hero = winrateData.find((h: HeroValue) => h.hero === heroName);
		return hero ? hero.value : 0;
	}

	getRoleWinrate(role: string): number {
		const winrateData = this.getWinrateData();
		if (!winrateData || !this.heroes.length) return 0;
		
		// Get heroes by role from API data
		const heroesInRole = this.heroes
			.filter(hero => hero.role.toLowerCase() === role.toLowerCase())
			.map(hero => hero.key);
		
		const roleHeroes = winrateData.filter(hero => heroesInRole.includes(hero.hero));
		
		if (roleHeroes.length === 0) return 0;
		
		// Calculate average winrate for the role
		const totalWinrate = roleHeroes.reduce((total, hero) => total + hero.value, 0);
		return totalWinrate / roleHeroes.length;
	}

	// Helper method for template
	get Math() {
		return Math;
	}

	onImageError(event: any): void {
		event.target.src = 'assets/images/default-avatar.jpg';
	}

	loadHeroes(): void {
		this.heroService.getAllHeroes().subscribe({
			next: (heroes: HeroData[]) => {
				this.heroes = heroes;
			},
			error: (err: any) => {
				console.error('Error loading heroes:', err);
			}
		});
	}

	getHeroImage(heroName: string): string {
		// Normalize hero name to match API format
		const normalizedName = heroName.toLowerCase().replace(/[^a-z0-9]/g, '');
		
		const hero = this.heroes.find(h => {
			const heroKey = h.key.toLowerCase();
			const heroNameLower = h.name.toLowerCase().replace(/[^a-z0-9]/g, '');
			return heroKey === normalizedName || heroNameLower === normalizedName;
		});
		
		return hero?.portrait || 'assets/images/default-hero.jpg';
	}

	formatHeroName(heroName: string): string {
		// Replace hyphens with spaces and capitalize properly
		return heroName
			.replace(/-/g, ' ')
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(' ');
	}

	getRanksForCurrentPlatform(): any[] {
		if (!this.player?.summary?.competitive) return [];

		const ranks = [];
		const platform = this.selectedPlatform === 'pc' ? 'pc' : 'console';
		const competitiveData = this.player.summary.competitive[platform];

		if (competitiveData) {
			// Tank rank
			if (competitiveData.tank) {
				ranks.push({
					role: 'tank',
					roleName: 'TANK',
					rank: competitiveData.tank
				});
			}

			// Damage rank
			if (competitiveData.damage) {
				ranks.push({
					role: 'damage',
					roleName: 'DAMAGE',
					rank: competitiveData.damage
				});
			}

			// Support rank
			if (competitiveData.support) {
				ranks.push({
					role: 'support',
					roleName: 'SUPPORT',
					rank: competitiveData.support
				});
			}
		}

		return ranks;
	}

	// BattleTag input mask methods
	onBattletagInput(event: any): void {
		let value = event.target.value;
		
		// If there's a #, handle username and ID parts separately
		if (value.includes('#')) {
			const parts = value.split('#');
			if (parts.length === 2) {
				// Clean username part (alphanumeric only)
				const username = parts[0].replace(/[^a-zA-Z0-9]/g, '').substring(0, 20);
				// Clean ID part (numbers only)
				const id = parts[1].replace(/[^0-9]/g, '').substring(0, 5);
				value = `${username}#${id}`;
			}
		} else {
			// If no #, only allow alphanumeric characters
			value = value.replace(/[^a-zA-Z0-9]/g, '');
			
			// Limit username length to prevent too long inputs
			if (value.length > 20) {
				value = value.substring(0, 20);
			}
		}
		
		this.searchInput = value;
		event.target.value = value;
	}

	onBattletagKeyDown(event: any): void {
		// Allow backspace, delete, arrow keys, tab, etc.
		const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
		
		if (allowedKeys.includes(event.key)) {
			return;
		}
		
		// If user types #, add it and focus on numbers
		if (event.key === '#') {
			event.preventDefault();
			this.addHashtagToInput();
			return;
		}
		
		// If we already have #, only allow numbers
		if (this.searchInput.includes('#')) {
			if (!/^[0-9]$/.test(event.key)) {
				event.preventDefault();
			}
		} else {
			// If no # yet, only allow alphanumeric
			if (!/^[a-zA-Z0-9]$/.test(event.key)) {
				event.preventDefault();
			}
		}
	}

	onBattletagKeyUp(event: any): void {
		// No auto-formatting - user must type # manually
	}

	private addHashtagToInput(): void {
		if (!this.searchInput.includes('#')) {
			this.searchInput += '#';
		}
	}

	onBattletagFocus(event: any): void {
		// If input is empty, show placeholder behavior
		if (!this.searchInput) {
			event.target.placeholder = 'Username#1234';
		}
	}

	onBattletagBlur(event: any): void {
		// No auto-formatting on blur - user must type # manually
	}
}
