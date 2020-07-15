import { Component,DoCheck,OnInit } from '@angular/core';
import { Trmcolombia3Service } from './services/trmcolombia3.service';
import { Coinmarketcap3Service } from './services/coinmarketcap3.service';
import { TRM } from './models/trm';
import { RootObject , Coin } from './models/coin';
import { Info } from './models/coininfo';

@Component({
  selector: 'app-table3',
  templateUrl: './table3.component.html',
  styleUrls: ['./table3.component.css']
})

export class Table3Component implements DoCheck, OnInit{

  public precioDolar: number;
  public cantidad: number;
  public resultado: number;
  public grandTotalQuantity:number;
  public grandTotalPriceUSD:number;
  public grandTotalPriceCOL:number;
  public grandTotalPriceCOLTRM:number;
  public grandTotalDifferentTRM:number;
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
  public manualtrm:number;
  public colorText:string;

  constructor(private trmcolombiaService: Trmcolombia3Service, private coinmarketcapService: Coinmarketcap3Service){
    this.precioDolar = 0;
    this.manualtrm = 0;
    this.colorText = "text-center row-center text-blob";
  }

  ngOnInit(){ 
    this.getCallServiceCoinPrice(1,10);
    this.getCallServiceTrm();
  }

  ngDoCheck(){
    this.getGrandTotalQuantity();
    this.getGrandTotalPriceUSD();
    this.getGrandTotalPriceCOL();
    this.getGrandTotalPriceCOLTRM();
    this.getGrandTotalDifferentTRM();
    
  }
  
  getCallServiceCoinPrice(start:number,limit:number){
   
    this.coinmarketcapService.getCoinPrice<RootObject[]>(start,limit).subscribe(
      resp => { 

        this.getCallServiceTrm();
        this.itemsCoin = []
        let arrayNumber = []
     
        for (let index = 0; index < resp['data'].length; index++) {
          let objectCoin = new Coin();
          objectCoin.id = resp['data'][index].id;
          objectCoin.coin = resp['data'][index].name;
          objectCoin.symbol = resp['data'][index].symbol
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

  getGrandTotalPriceCOLTRM(){  
    let suma = 0;
    if(this.itemsCoin != null || this.itemsCoin != undefined){
      for (let index = 0; index < this.itemsCoin.length; index++) {
        suma = suma + this.itemsCoin[index].totalCOLTMR;
        }
        this.grandTotalPriceCOLTRM = suma;
    }
  }

  getGrandTotalDifferentTRM(){  
    let suma = 0;
    if(this.itemsCoin != null || this.itemsCoin != undefined){
      for (let index = 0; index < this.itemsCoin.length; index++) {
        suma = suma + this.itemsCoin[index].differentTMR;
        }
        this.grandTotalDifferentTRM = suma;
    }
  }

  getCalculation(quantity:number, price:number, index:number){ 
      this.getCallServiceTrm();
      this.itemsCoin[index].priceCol = (price * this.manualtrm);
      this.itemsCoin[index].totalUSD = (quantity * price);
      this.itemsCoin[index].totalCOL = (quantity * price * this.manualtrm);
      this.itemsCoin[index].totalCOLTMR = (quantity * price * parseFloat(this.priceValue));
      this.itemsCoin[index].differentTMR = (quantity * price * parseFloat(this.priceValue)) - (quantity * price * this.manualtrm);

      if(this.itemsCoin[index].differentTMR === 0){
        this.colorText = "text-center row-center text-blob";
      }else if(this.itemsCoin[index].differentTMR > 0){
        this.colorText = "text-center row-center text-blob green-positivo";
      }else{
        this.colorText = "text-center row-center text-blob red-negativo";
      }
  }

  getDate(){
    let date = new Date();
    return date.toLocaleDateString('sv-SE', { timeZone: 'America/Bogota' }).toString();
  }

}