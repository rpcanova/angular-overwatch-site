import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { HeroDetailsComponent } from './pages/heroes/hero-details/hero-details.component';
import { MapsComponent } from './pages/maps/maps.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },

    {
        path: 'herolist',
        component: HeroesComponent,
        children: [
            {
                path: ':key',
                component: HeroDetailsComponent,
                pathMatch: 'full'
            }
        ]
    },

    {
        path: 'maplist',
        component: MapsComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }