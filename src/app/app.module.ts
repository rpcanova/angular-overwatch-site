import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroCardComponent } from './pages/heroes/hero-card/hero-card.component';
import { MapsComponent } from './pages/maps/maps.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { TitleComponent } from './components/title/title.component';
import { SectionComponent } from './components/section/section.component';
import { MapCardComponent } from './pages/maps/map-card/map-card.component';
import { HeroDetailsComponent } from './pages/heroes/hero-details/hero-details.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        HeroesComponent,
        FilterButtonComponent,
        HeroCardComponent,
        FooterComponent,
        MapsComponent,
        TitleComponent,
        SectionComponent,
        MapCardComponent,
        HeroDetailsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }