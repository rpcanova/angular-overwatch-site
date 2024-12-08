import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-filter-button',
    templateUrl: './filter-button.component.html',
    styleUrl: './filter-button.component.css'
})
export class FilterButtonComponent {
    @Input()
    typeFilter: string = ""
}