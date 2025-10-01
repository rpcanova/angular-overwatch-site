import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { SharedModule } from '../../shared/shared.module';

const heroesRoutes: Routes = [
	{
		path: '',
		component: HeroesComponent,
	},

	{
		path: ':key',
		component: HeroDetailsComponent,
	},
];

@NgModule({
	declarations: [HeroesComponent, HeroCardComponent, HeroDetailsComponent],
	imports: [CommonModule, RouterModule.forChild(heroesRoutes), SharedModule],
})
export class HeroesModule {}
