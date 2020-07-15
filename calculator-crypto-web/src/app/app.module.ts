import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { TabsComponent } from './tabs/tabs.component';
import { Table1Component } from './table1/table1.component';
import { Table2Component } from './table2/table2.component';
import { Table3Component } from './table3/table3.component';

//Services
import { Coinmarketcap1Service } from './table1/services/coinmarketcap1.service';
import { Trmcolombia1Service } from './table1/services/trmcolombia1.service';
import { Coinmarketcap2Service } from './table2/services/coinmarketcap2.service';
import { Trmcolombia2Service } from './table2/services/trmcolombia2.service';
import { Coinmarketcap3Service } from './table3/services/coinmarketcap3.service';
import { Trmcolombia3Service } from './table3/services/trmcolombia3.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    TabsComponent,
    Table1Component,
    Table2Component,
    Table3Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    Coinmarketcap1Service,
    Trmcolombia1Service,
    Coinmarketcap2Service,
    Trmcolombia2Service,
    Coinmarketcap3Service,
    Trmcolombia3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
