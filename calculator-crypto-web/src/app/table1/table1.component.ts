import { Component,DoCheck,OnInit } from '@angular/core';
import { Trmcolombia1Service } from './services/trmcolombia1.service';
import { Coinmarketcap1Service } from './services/coinmarketcap1.service';
import { TRM } from './models/trm';
import { RootObject , Coin } from './models/coin';
import { Info } from './models/coininfo';

@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})

export class Table1Component implements DoCheck, OnInit{

  public precioDolar: number;
  public cantidad: number;
  public resultado: number;
  public grandTotalQuantity:number;
  public grandTotalPriceUSD:number;
  public grandTotalPriceCOL:number;
  public priceValue:string;
  public date:string;
  public start:string;
  public limit:string;
  public id:number;
  public trm:TRM;
  public coinPrice:Array<RootObject> = [];
  public coinInfo:Array<Info> = [];
  public itemsCoin:Array<Coin> = [];
  public info:Array<Info> = [];
  public coininfoArray:Array<Info> = [];
  public valueFilter:number[] = [10,20,30,40]
  public valueSelected:number;

  constructor(private trmcolombiaService: Trmcolombia1Service, private coinmarketcapService: Coinmarketcap1Service){
    this.precioDolar = 0;
    this.cantidad= 0;
  }

  ngOnInit(){ 
    this.getCallServiceCoinPrice(1,10);
    this.getCallServiceTrm();
  }

  ngDoCheck(){
    this.getGrandTotalQuantity();
    this.getGrandTotalPriceUSD();
    this.getGrandTotalPriceCOL();
  }

  getCallServiceCoinPrice(start:number,limit:number){
   
    this.coinmarketcapService.getCoinPrice<RootObject[]>(start,limit).subscribe(
      resp => { 

        this.getCallServiceTrm();
        let price = 0;
        this.itemsCoin = []
        let arrayNumber = []
     
        for (let index = 0; index < resp['data'].length; index++) {
          let objectCoin = new Coin();
          objectCoin.id = resp['data'][index].id;
          objectCoin.coin = resp['data'][index].name;
          objectCoin.symbol = resp['data'][index].symbol
          price = resp['data'][index].quote.USD.price
          objectCoin.price = price
          objectCoin.priceCol = price * parseFloat(this.priceValue);
          this.itemsCoin.push(objectCoin); 
        }

        for (let index = 0; index < this.itemsCoin.length; index++) {
            let ids = this.itemsCoin[index].id
            arrayNumber.push(ids)
        }
        
        this.getCallServiceCoinInfo(arrayNumber)

      }
    ),
      error => console.log(error),
    () => console.log('Api CoinMarketCap Consumida');
   
  }

  getCallServiceCoinInfo(id:number[]){

    if (id[0] !== 0) {
      this.coinmarketcapService.getCoinInfo<Info[]>(id).subscribe(
        resp => {
          for(let ids of this.itemsCoin){
              let logoCoin = Object.values(resp)[1][ids.id].logo;

              for (let index = 0; index < this.itemsCoin.length; index++) {
                let id = this.itemsCoin[index].id;
                if(id == ids.id){
                  this.itemsCoin[index].image = logoCoin
                }
              }
          }   
        }
        ),
        error => console.log(error),
      () => console.log('Api CoinInfo Consumida');
    }
  }

  getCallServiceTrm(){
    this.date = this.getDate();
    this.trmcolombiaService.getTRM<TRM>(this.date).subscribe(
      trm =>  this.priceValue = trm.Value
    ),
      error => console.log(error),
    () => console.log('Api TRM Consumida');
  }
    
  getItemCoin(){
    this.getCallServiceCoinPrice(1, this.valueSelected);
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
    this.getCallServiceTrm();
    this.itemsCoin[index].totalUSD = quantity * price;
    this.itemsCoin[index].totalCOL = quantity * price * parseFloat(this.priceValue);
}

  getDate(){
    let date = new Date();
    return date.toLocaleDateString('sv-SE', { timeZone: 'America/Bogota' }).toString();
  }

}