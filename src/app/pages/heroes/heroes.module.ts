import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroPortraitComponent } from './hero-portrait/hero-portrait.component';
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { HeroesComponent } from './heroes.component';



@NgModule({
    declarations: [
        HeroPortraitComponent,
        FilterButtonComponent,
        HeroesComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeroesComponent,
        HeroPortraitComponent,
        FilterButtonComponent
    ]
})
export class HeroesModule { }
