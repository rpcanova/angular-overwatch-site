import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
    },

    {
        path: 'herolist',
        loadChildren: () => import('./pages/heroes/heroes.module').then(m => m.HeroesModule)
    },

    {
        path: 'maplist',
        loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsModule)
    },

    {
        path: 'playerlist',
        loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule)
    },

    {
        path: 'players',
        loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule)
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