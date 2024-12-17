import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { StoryComponent } from './pages/story/story.component';
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
                path: ':key/story',
                component: StoryComponent,
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
