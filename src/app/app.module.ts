import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from "@angular/common/http";
import { CurrencyRateMemeComponent } from './currency-rate-meme/currency-rate-meme.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input"
import { ReactiveFormsModule } from '@angular/forms';

//Ng-awesome-popup
import {
    NgxAwesomePopupModule,
    DialogConfigModule,
    ConfirmBoxConfigModule,
    ToastNotificationConfigModule
 } from '@costlydeveloper/ngx-awesome-popup';
import { VisualMediaObject } from './_payload/visual-media-object';

@NgModule({
  declarations: [
        AppComponent,
        CurrencyRateMemeComponent,
        VisualMediaObject
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
        DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
        ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
        ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
        MatAutocompleteModule,
        MatButtonModule
    ]
})
export class AppModule { }
