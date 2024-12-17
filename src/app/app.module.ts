import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoryComponent } from './pages/story/story.component';
import { HeroCardComponent } from './pages/heroes/hero-card/hero-card.component';
import { MapsComponent } from './pages/maps/maps.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { FilterButtonComponent } from './pages/heroes/filter-button/filter-button.component';
import { TitleComponent } from './components/title/title.component';
import { SectionComponent } from './components/section/section.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        HeroesComponent,
        FilterButtonComponent,
        HeroCardComponent,
        FooterComponent,
        StoryComponent,
        MapsComponent,
        TitleComponent,
        SectionComponent,
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