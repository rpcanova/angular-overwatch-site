import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PlayersComponent } from './players.component';
import { SharedModule } from '../../shared/shared.module';

const playersRoutes: Routes = [
	{
		path: '',
		component: PlayersComponent,
	},
	{
		path: ':battletag',
		component: PlayersComponent,
	},
];

@NgModule({
	declarations: [PlayersComponent],
	imports: [CommonModule, RouterModule.forChild(playersRoutes), SharedModule],
})
export class PlayersModule {}
