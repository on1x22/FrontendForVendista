import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
//import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
//import { MatListModule } from '@angular/material/list';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    //DropDownListModule
    FormsModule,
    BrowserAnimationsModule,
    //MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
