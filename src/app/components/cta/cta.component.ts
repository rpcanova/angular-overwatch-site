import { Component, Input } from '@angular/core'

@Component({
	selector: 'app-cta',
	templateUrl: './cta.component.html',
	styleUrls: ['./cta.component.css'],
})
export class CtaComponent {
	@Input() title: string = 'Ready to join the fight?'
	@Input() description: string = 'Explore heroes, maps, and become part of the Overwatch universe!'
	@Input() buttonText: string = 'Play Now'
}