import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterButtonComponent } from '../components/filter-button/filter-button.component';
import { TitleComponent } from '../components/title/title.component';
import { SectionComponent } from '../components/section/section.component';
import { CtaComponent } from '../components/cta/cta.component';
import { SafePipe } from './safe.pipe';

@NgModule({
	declarations: [
		FilterButtonComponent, TitleComponent, SectionComponent, CtaComponent, SafePipe
	],
	imports: [CommonModule],
	exports: [FilterButtonComponent, TitleComponent, SectionComponent, CtaComponent, SafePipe],
})
export class SharedModule {}