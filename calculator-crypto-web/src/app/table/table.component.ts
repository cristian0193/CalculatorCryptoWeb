import { Component,DoCheck,OnInit } from '@angular/core';
import { TrmcolombiaService } from './services/trmcolombia.service';
import { CoinmarketcapService } from './services/coinmarketcap.service';
import { TRM } from './models/trm';
import { Coin } from './models/coin';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements DoCheck, OnInit{

  public precioDolar: number;
  public cantidad: number;
  public resultado: number;
  public grandTotalQuantity:number;
  public grandTotalPriceUSD:number;
  public grandTotalPriceCOL:number;
  public priceValue:string;
  public date:string;
  public trm:TRM[];
  public start:string;
  public limit:string;
  public coin:any[];
  public itemsCoin:Coin[];
 

  constructor(private trmcolombiaService: TrmcolombiaService, private coinmarketcapService: CoinmarketcapService){
    this.precioDolar = 0;
    this.cantidad= 0;
  }

  ngOnInit(){ 
    this.getCallServiceCoin();
    this.getCallServiceTrm();
  }

  ngDoCheck(){
    this.getGrandTotalQuantity();
    this.getGrandTotalPriceUSD();
    this.getGrandTotalPriceCOL();
  }

  getCallServiceCoin(){
    this.start = "1";
    this.limit = "10";
    this.coinmarketcapService.getCoinPrice(this.start,this.limit).subscribe(
      coin => this.coin = coin
    ),
      error => console.log(error),
    () => console.log('Api CoinMarketCap Consumida');
    console.log(this.coin);
  }

  getCallServiceTrm(){
    this.date = this.getDate();
    this.trmcolombiaService.getTRM(this.date).subscribe(
      trm => this.trm = trm
    ),
      error => console.log(error),
    () => console.log('Api TRM Consumida'); 
    console.log(this.trm);
  }

  getTrmColombia(){
    this.getCallServiceTrm();
    this.priceValue = Object.values(this.trm)[4].toString();
  }

  getItemCoin(){
    this.getCallServiceCoin();
    this.itemsCoin = []
    for (let index = 0; index < Object.values(this.coin)[1].length; index++) {
      let objectCoin = new Coin();
      objectCoin.coin = Object.values(this.coin)[1][index].name
      objectCoin.symbol = Object.values(this.coin)[1][index].symbol
      objectCoin.price = Object.values(this.coin)[1][index].quote.USD.price
      this.itemsCoin.push(objectCoin);      
    }
    console.log(this.itemsCoin);
    
  }

  getGrandTotalQuantity(){
    let suma = 0;
    for (let index = 0; index < this.itemsCoin.length; index++) {
    suma = suma + this.itemsCoin[index].quantity;
    }
    this.grandTotalQuantity = suma;
  }

  getGrandTotalPriceUSD(){  
    let suma = 0;
    for (let index = 0; index < this.itemsCoin.length; index++) {
    suma = suma + this.itemsCoin[index].totalUSD;
    }
    this.grandTotalPriceUSD = suma;
  }

  getGrandTotalPriceCOL(){  
    let suma = 0;
    for (let index = 0; index < this.itemsCoin.length; index++) {
    suma = suma + this.itemsCoin[index].totalCOL;
    }
    this.grandTotalPriceCOL = suma;
  }

  getCalculation(quantity:number, price:number, index:number){ 
      this.itemsCoin[index].totalUSD = quantity * price;
      this.itemsCoin[index].totalCOL = quantity * price * 3700;
  }

  getDate(){
    let date = new Date();
    return date.toLocaleDateString('sv-SE', { timeZone: 'America/Bogota' }).toString();
  }

}
