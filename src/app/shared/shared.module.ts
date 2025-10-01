import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { TitleComponent } from './components/title/title.component';
import { SectionComponent } from './components/section/section.component';
import { CtaComponent } from './components/cta/cta.component';
import { SafePipe } from './safe.pipe';
import { CtaButtonComponent } from './cta-button/cta-button.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ProfileNavComponent } from './profile-nav/profile-nav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
	declarations: [
		FilterButtonComponent, TitleComponent, SectionComponent, CtaComponent, SafePipe, CtaButtonComponent, LoadingSpinnerComponent, ProfileNavComponent, NavbarComponent, FooterComponent
	],
	imports: [CommonModule, FormsModule, RouterModule],
	exports: [FilterButtonComponent, TitleComponent, SectionComponent, CtaComponent, SafePipe, LoadingSpinnerComponent, ProfileNavComponent, NavbarComponent, FooterComponent, FormsModule, RouterModule],
})
export class SharedModule {}