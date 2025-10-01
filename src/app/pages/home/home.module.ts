import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';

const homeRoutes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
];

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, RouterModule.forChild(homeRoutes), SharedModule],
})
export class HomeModule {}