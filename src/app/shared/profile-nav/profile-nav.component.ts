import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-profile-nav',
	templateUrl: './profile-nav.component.html',
	styleUrls: ['./profile-nav.component.css']
})
export class ProfileNavComponent {
	@Input() tabs: string[] = [];
	@Input() activeTab: string = '';
	@Input() tabLabels: { [key: string]: string } = {};
	@Output() tabChange = new EventEmitter<string>();

	onTabClick(tab: string): void {
		this.activeTab = tab;
		this.tabChange.emit(tab);
	}
}