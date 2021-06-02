import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnackbarCustomComponent } from './snackbar-custom/snackbar-custom.component';
import { SnackbarModule } from './snackbar/snackbar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SnackbarModule.forRoot({
      component: SnackbarCustomComponent,
      message: 'Something went wrong',
      duration: 0,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
