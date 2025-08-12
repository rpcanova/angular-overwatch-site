import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    
    onPlayNowClick(): void {
        window.open('https://store.steampowered.com/app/2357570/Overwatch_2/', '_blank');
    }
}