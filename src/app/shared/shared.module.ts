import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterButtonComponent } from '../components/filter-button/filter-button.component';
import { TitleComponent } from '../components/title/title.component';
import { SectionComponent } from '../components/section/section.component';

@NgModule({
	declarations: [
		FilterButtonComponent, TitleComponent, SectionComponent
	],
	imports: [CommonModule],
	exports: [FilterButtonComponent, TitleComponent, SectionComponent],
})
export class SharedModule {}