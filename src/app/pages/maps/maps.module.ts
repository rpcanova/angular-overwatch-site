import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MapsComponent } from './maps.component';
import { MapCardComponent } from './components/map-card/map-card.component';
import { SharedModule } from '../../shared/shared.module';

const mapsRoutes: Routes = [
	{
		path: '',
		component: MapsComponent,
	},
];

@NgModule({
	declarations: [MapsComponent, MapCardComponent],
	imports: [CommonModule, RouterModule.forChild(mapsRoutes), SharedModule],
})
export class MapsModule {}
