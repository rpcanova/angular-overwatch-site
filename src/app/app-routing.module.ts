import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MapsComponent } from './pages/maps/maps.component';
import { PlayersComponent } from './pages/players/players.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },

    {
        path: 'herolist',
        loadChildren: () => import('./pages/heroes/heroes.module').then(m => m.HeroesModule)
    },

    {
        path: 'maplist',
        component: MapsComponent,
        pathMatch: 'full'
    },

    {
        path: 'playerlist',
        component: PlayersComponent,
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }