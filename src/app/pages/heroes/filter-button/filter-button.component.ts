import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-filter-button',
    templateUrl: './filter-button.component.html',
    styleUrl: './filter-button.component.css'
})
export class FilterButtonComponent implements OnInit {
    @Input() typeFilter: string = ''
    @Input() isActive: boolean = false
    @Output() filterChange = new EventEmitter<string>()

    ngOnInit(): void {
    }

    applyFilter() {
        this.filterChange.emit(this.typeFilter.toUpperCase())
    }
}