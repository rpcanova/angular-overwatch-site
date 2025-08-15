import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterButtonComponent } from '../components/filter-button/filter-button.component';
import { TitleComponent } from '../components/title/title.component';
import { SectionComponent } from '../components/section/section.component';
import { CtaComponent } from '../components/cta/cta.component';
import { SafePipe } from './safe.pipe';
import { CtaButtonComponent } from './cta-button/cta-button.component';

@NgModule({
	declarations: [
		FilterButtonComponent, TitleComponent, SectionComponent, CtaComponent, SafePipe, CtaButtonComponent
	],
	imports: [CommonModule],
	exports: [FilterButtonComponent, TitleComponent, SectionComponent, CtaComponent, SafePipe],
})
export class SharedModule {}