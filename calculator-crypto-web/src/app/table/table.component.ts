import { Component,DoCheck,OnInit } from '@angular/core';
import { TrmcolombiaService } from './services/trmcolombia.service';
import { CoinmarketcapService } from './services/coinmarketcap.service';
import { TRM } from './models/trm';
import { RootObject , Coin } from './models/coin';
import { Info } from './models/coininfo';
import { EMPTY } from 'rxjs';

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
  public start:string;
  public limit:string;
  public id:number;
  public trm:TRM;
  public coinPrice:Array<RootObject> = [];
  public coinInfo:Array<Info> = [];
  public itemsCoin:Array<Coin> = [];
  public info:Array<Info> = [];
 

  constructor(private trmcolombiaService: TrmcolombiaService, private coinmarketcapService: CoinmarketcapService){
    this.precioDolar = 0;
    this.cantidad= 0;
    //this.getCallServiceCoinInfo(1);
  }

  ngOnInit(){ 
    this.getCallServiceCoinPrice();
    this.getCallServiceTrm();
  }

  ngDoCheck(){
    this.getGrandTotalQuantity();
    this.getGrandTotalPriceUSD();
    this.getGrandTotalPriceCOL();
  }

  getCallServiceCoinPrice(){
    this.start = "1";
    this.limit = "25";
    this.coinmarketcapService.getCoinPrice<RootObject[]>(this.start,this.limit).subscribe(
      resp =>this.coinPrice = resp
    ),
      error => console.log(error),
    () => console.log('Api CoinMarketCap Consumida');   
  }

  getCallServiceCoinInfo(id:number){
    this.coinInfo = []
    this.coinmarketcapService.getCoinInfo<Info[]>(id).subscribe(
      response => {
        let infCoin = new Info();
        infCoin.id = id
        infCoin.logo = Object.values(response)[1][id].logo
        this.coinInfo.push(infCoin);

        /*if(Object.values(response)[1][id] !== undefined){
          for (let i = 0; i < this.coinInfo.length; i++) {
            let idinfo = this.coinInfo[i].id;
            let idinfologo = this.coinInfo[i].logo;

            if(id === idinfo){
              this.itemsCoin[i].image = idinfologo
            }
        }
      }*/
    }
    ),
      error => console.log(error),
    () => console.log('Api CoinMarketCap Consumida');
  
  }

  getCallServiceTrm(){
    this.date = this.getDate();
    this.trmcolombiaService.getTRM<TRM>(this.date).subscribe(
      trm => this.trm = trm
    ),
      error => console.log(error),
    () => console.log('Api TRM Consumida'); 
  }

  getTrmColombia(){
    this.getCallServiceTrm();
      if(this.trm.Value !== undefined){
        this.priceValue =  this.trm.Value;
      }
  }
    
  getItemCoin(){
    this.getCallServiceCoinPrice();
    this.getCallServiceTrm();
    let price = 0;
    this.itemsCoin = []
    
    if(this.trm.Value !== undefined){
      this.priceValue =  this.trm.Value;
    }
     
    for (let index = 0; index < this.coinPrice["data"].length; index++) {
      let objectCoin = new Coin();
      objectCoin.id = this.coinPrice["data"][index].id;
      objectCoin.coin = this.coinPrice["data"][index].name;
      objectCoin.symbol = this.coinPrice["data"][index].symbol
      price = this.coinPrice["data"][index].quote.USD.price
      objectCoin.price = price
      objectCoin.priceCol = price * parseFloat(this.priceValue);
      this.itemsCoin.push(objectCoin); 
    }
    this.getImgLogo();
  }

  getImgLogo(){
    for (let index = 0; index < this.itemsCoin.length; index++) {
        const ids = this.itemsCoin[index].id
        //this.getCallServiceCoinInfo(ids) 
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
