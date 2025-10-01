export interface PlayerData {
	summary: PlayerSummary;
	stats: PlayerStats;
}

export interface PlayerSummary {
	username: string;
	avatar?: string;
	namecard?: string;
	title?: string;
	endorsement?: EndorsementInfo;
	competitive?: CompetitiveInfo;
	last_updated_at?: number;
}

export interface EndorsementInfo {
	level: number;
	frame?: string;
}

export interface CompetitiveInfo {
	pc?: PlatformCompetitive;
	console?: PlatformCompetitive;
}

export interface PlatformCompetitive {
	tank?: RankInfo | null;
	damage?: RankInfo | null;
	support?: RankInfo | null;
	open?: RankInfo | null;
	season?: number;
}

export interface RankInfo {
	division: string;
	tier: number;
	role_icon?: string;
	rank_icon?: string;
}

export interface PlayerStats {
	pc?: PlatformStats;
	console?: PlatformStats;
}

export interface PlatformStats {
	quickplay?: GameModeStats;
	competitive?: GameModeStats;
}

export interface GameModeStats {
	heroes_comparisons: HeroComparisons;
	career_stats?: CareerStats;
}

export interface HeroComparisons {
	time_played: ComparisonData;
	games_won: ComparisonData;
	win_percentage: ComparisonData;
	weapon_accuracy_best_in_game: ComparisonData;
	eliminations_per_life: ComparisonData;
	[key: string]: ComparisonData;
}

export interface ComparisonData {
	label: string;
	values: HeroValue[];
}

export interface HeroValue {
	hero: string;
	value: number;
}

export interface CareerStats {
	[heroName: string]: HeroStats[];
}

export interface HeroStats {
	category: string;
	label: string;
	stats: StatItem[];
}

export interface StatItem {
	key: string;
	label: string;
	value: number;
}

// Legacy interfaces for backward compatibility
export interface PlayerHeroes {
	tank: HeroStats[];
	damage: HeroStats[];
	support: HeroStats[];
}

export interface HeroComparison {
	hero: string;
	time_played: number;
	games_played: number;
	games_won: number;
	winrate: number;
	eliminations_per_10min: number;
	deaths_per_10min: number;
	hero_damage_per_10min: number;
	healing_per_10min: number;
	ultimates_earned_per_10min: number;
	final_blows_per_10min: number;
	objective_kills_per_10min: number;
	objective_time_per_10min: number;
	solo_kills_per_10min: number;
	critical_hits_per_10min: number;
	critical_hit_accuracy: number;
	weapon_accuracy: number;
	time_spent_on_fire_per_10min: number;
	defensive_assists_per_10min: number;
	offensive_assists_per_10min: number;
}
