import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-filter-button',
    templateUrl: './filter-button.component.html',
    styleUrls: ['./filter-button.component.css', './filter-button.responsive.component.css']
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

    formatTypeFilter(filter: string): string {
        return filter.replace(/-/g, ' ')
    }
}