import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-cta-button',
	templateUrl: './cta-button.component.html',
	styleUrl: './cta-button.component.css',
})
export class CtaButtonComponent {
	@Input() buttonText: string = 'Play Now'
	@Input() buttonAction: () => void = () => {
		window.open('https://store.steampowered.com/app/2357570/Overwatch_2/', '_blank')
	}
}
