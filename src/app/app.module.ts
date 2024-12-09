import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoryComponent } from './pages/story/story.component';
import { HeroPortraitComponent } from './pages/heroes/hero-portrait/hero-portrait.component';
import { FilterButtonComponent } from './pages/heroes/filter-button/filter-button.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { MapsComponent } from './pages/maps/maps.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        HeroesComponent,
        HeroPortraitComponent,
        FilterButtonComponent,
        FooterComponent,
        StoryComponent,
        MapsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        provideClientHydration()
    ]
})
export class AppModule { }
