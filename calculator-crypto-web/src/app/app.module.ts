import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { TabsComponent } from './tabs/tabs.component';
import { TableComponent } from './table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CoinmarketcapService } from './table/services/coinmarketcap.service';
import { TrmcolombiaService } from './table/services/trmcolombia.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    TabsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CoinmarketcapService,TrmcolombiaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
