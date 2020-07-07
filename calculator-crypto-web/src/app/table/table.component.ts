import { Component,DoCheck } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements DoCheck{

  public precioDolar: number;
  public cantidad: number;
  public resultado: number;
  public grandTotalQuantity:number;
  public grandTotalPriceUSD:number;
  public grandTotalPriceCOL:number;

  constructor(){
    this.precioDolar = 0;
    this.cantidad= 0;
  }

  public items: Array<any> = [
    {
       coin: 'Bitcoin',
       price: 9000,
       priceCol: 36000000,
       quantity: 0,
       totalUSD: 0,
       totalCOL: 0
    },
    {
      coin: 'Ether',
      price: 250,
      priceCol: 850000,
      quantity: 0,
      totalUSD: 0,
      totalCOL: 0
   }];

  ngDoCheck(){
    this.getGrandTotalQuantity();
    this.getGrandTotalPriceUSD();
    this.getGrandTotalPriceCOL();
  }

  getGrandTotalQuantity(){
    let suma = 0;
    for (let index = 0; index < this.items.length; index++) {
    suma = suma + this.items[index].quantity;
    }
    this.grandTotalQuantity = suma;
  }

  getGrandTotalPriceUSD(){  
    let suma = 0;
    for (let index = 0; index < this.items.length; index++) {
    suma = suma + this.items[index].totalUSD;
    }
    this.grandTotalPriceUSD = suma;
  }

  getGrandTotalPriceCOL(){  
    let suma = 0;
    for (let index = 0; index < this.items.length; index++) {
    suma = suma + this.items[index].totalCOL;
    }
    this.grandTotalPriceCOL = suma;
  }

  getCalculation(quantity:number, price:number, index:number){ 
      this.items[index].totalUSD = quantity * price;
      this.items[index].totalCOL = quantity * price * 3700;
  }

}
