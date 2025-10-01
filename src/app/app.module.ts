import { NgModule } from '@angular/core';
import {
	BrowserModule,
	provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		SharedModule,
	],
	providers: [provideClientHydration()],
	bootstrap: [AppComponent],
})
export class AppModule {}
