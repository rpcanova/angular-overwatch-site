import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HeroService } from '../../../../services/hero.service'
import { HeroData, VideoLink } from '../../../../models/heroData'

@Component({
	selector: 'app-hero-details',
	templateUrl: './hero-details.component.html',
	styleUrls: ['./hero-details.component.css', './hero-details.responsive.component.css']
})
export class HeroDetailsComponent implements OnInit {
	hero: HeroData | null = null
	loading: boolean = true
	error: boolean = false

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private heroService: HeroService
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			const heroKey = params['key']

			if (heroKey) {
				this.loadHeroDetails(heroKey)
			}
		})
	}

	loadHeroDetails(heroKey: string): void {
		this.loading = true
		this.error = false

		this.heroService.getHeroByKey(heroKey).subscribe({
			next: (heroData: HeroData) => {
				this.hero = heroData
				this.loading = false
			},

			error: (err) => {
				this.error = true
				this.loading = false
			},
		})
	}

	getVideoSource(videoLink: VideoLink): string {
		// Prefer mp4, fallback to webm
		return videoLink.mp4 || videoLink.webm
	}

	isYouTubeLink(url: string): boolean {
		return url.includes('youtube.com') || url.includes('youtu.be')
	}

	getYouTubeEmbedUrl(youtubeUrl: string): string {
		// Extract video ID from YouTube URL
		const videoId = this.extractYouTubeVideoId(youtubeUrl)
		return `https://www.youtube.com/embed/${videoId}`
	}

	private extractYouTubeVideoId(url: string): string {
		// Handle different YouTube URL formats
		const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
		const match = url.match(regExp)
		return (match && match[2].length === 11) ? match[2] : ''
	}

	goBack(): void {
		this.router.navigate(['/herolist'])
	}

	openComic(comicUrl: string): void {
		window.open(comicUrl, '_blank', 'noopener,noreferrer')
	}
}
