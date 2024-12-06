import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroPortraitComponent } from './components/hero-portrait/hero-portrait.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },

    {
        path: 'heroes',
        component: HeroPortraitComponent,
        children: [
            {
                path: ':key',
                component: HeroPortraitComponent,
                pathMatch: 'prefix'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
