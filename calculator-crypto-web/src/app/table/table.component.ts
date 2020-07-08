import { Component,DoCheck,OnInit } from '@angular/core';
import { TrmcolombiaService } from './trmcolombia.service';
import { TRM } from './trm';


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
  public date:string;
  public trm:TRM[];
  public priceValue:string;

  constructor(private trmcolombiaService: TrmcolombiaService){
    this.precioDolar = 0;
    this.cantidad= 0;
    this.date = '2020-07-07';
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

   ngOnInit(){
    this.trmcolombiaService.getTRM(this.date).subscribe(
      trm => this.trm = trm
    );    
  }
  
  getTrmColombia(){
    this.priceValue = Object.values(this.trm)[4].toString();
  }

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
