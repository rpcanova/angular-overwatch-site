import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroPortraitComponent } from './pages/heroes/hero-portrait/hero-portrait.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterButtonComponent } from './heroes/filter-button/filter-button.component';
import { StoryComponent } from './pages/story/story.component';

@NgModule({
    declarations: [
        AppComponent,
        HeroPortraitComponent,
        NavbarComponent,
        HomeComponent,
        HeroesComponent,
        FooterComponent,
        FilterButtonComponent,
        StoryComponent
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
