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
  public id:number;
  public coinPrice:any[];
  public coinInfo:any[];
  public itemsCoin:Coin[];
 

  constructor(private trmcolombiaService: TrmcolombiaService, private coinmarketcapService: CoinmarketcapService){
    this.precioDolar = 0;
    this.cantidad= 0;
  }

  ngOnInit(){ 
    this.getCallServiceCoinPrice();
    this.getCallServiceTrm();
    this.getCallServiceCoinInfo(1);
  }

  ngDoCheck(){
    this.getGrandTotalQuantity();
    this.getGrandTotalPriceUSD();
    this.getGrandTotalPriceCOL();
  }

  getCallServiceCoinPrice(){
    this.start = "1";
    this.limit = "25";
    this.coinmarketcapService.getCoinPrice(this.start,this.limit).subscribe(
      coin => this.coinPrice = coin
    ),
      error => console.log(error),
    () => console.log('Api CoinMarketCap Consumida');
  }

  getCallServiceCoinInfo(id:number){
    this.coinmarketcapService.getCoinInfo(id).subscribe(
      coininfo => this.coinInfo = coininfo
    ),
      error => console.log(error),
    () => console.log('Api CoinMarketCap Consumida');
  }

  getCallServiceTrm(){
    this.date = this.getDate();
    this.trmcolombiaService.getTRM(this.date).subscribe(
      trm => this.trm = trm
    ),
      error => console.log(error),
    () => console.log('Api TRM Consumida'); 
  }

  getTrmColombia(){
    this.getCallServiceTrm();
    this.priceValue = Object.values(this.trm)[4].toString();
  }

  getItemCoin(){
    this.getCallServiceCoinPrice();
    this.getCallServiceTrm();
    this.itemsCoin = []
    let price = 0;
    this.priceValue = Object.values(this.trm)[4].toString();
    
    for (let index = 0; index < Object.values(this.coinPrice)[1].length; index++) {
      let objectCoin = new Coin();
      
      let id = Object.values(this.coinPrice)[1][index].id
      this.getCallServiceCoinInfo(id);

      objectCoin.coin = Object.values(this.coinPrice)[1][index].name
      objectCoin.symbol = Object.values(this.coinPrice)[1][index].symbol
      price = Object.values(this.coinPrice)[1][index].quote.USD.price
      objectCoin.price = price
      objectCoin.priceCol = price * parseFloat(this.priceValue);
      
      if(Object.values(this.coinInfo)[1][id] != undefined){       
        objectCoin.image = Object.values(this.coinInfo)[1][id].logo
      }
      
      this.itemsCoin.push(objectCoin);      
    }
    
  }

  getGrandTotalQuantity(){
    let suma = 0;
    if(this.itemsCoin != null || this.itemsCoin != undefined){
      for (let index = 0; index < this.itemsCoin.length; index++) {
        suma = suma + this.itemsCoin[index].quantity;
        }
        this.grandTotalQuantity = suma;
      }
    }

  getGrandTotalPriceUSD(){  
    let suma = 0;
    if(this.itemsCoin != null || this.itemsCoin != undefined){
      for (let index = 0; index < this.itemsCoin.length; index++) {
        suma = suma + this.itemsCoin[index].totalUSD;
        }
        this.grandTotalPriceUSD = suma;
    } 
    
  }

  getGrandTotalPriceCOL(){  
    let suma = 0;
    if(this.itemsCoin != null || this.itemsCoin != undefined){
      for (let index = 0; index < this.itemsCoin.length; index++) {
        suma = suma + this.itemsCoin[index].totalCOL;
        }
        this.grandTotalPriceCOL = suma;
    }
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
