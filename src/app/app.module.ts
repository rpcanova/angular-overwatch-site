import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapsComponent } from './pages/maps/maps.component';
import { TitleComponent } from './components/title/title.component';
import { SectionComponent } from './components/section/section.component';
import { MapCardComponent } from './pages/maps/map-card/map-card.component';
import { PlayersComponent } from './pages/players/players.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent,
        MapsComponent,
        MapCardComponent,
        PlayersComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule
    ],
    providers: [
        provideClientHydration()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }