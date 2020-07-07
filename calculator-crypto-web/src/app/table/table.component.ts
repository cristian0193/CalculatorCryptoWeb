import { Component,DoCheck } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements DoCheck{

  public precioDolar: number;
  public cantidad: number;
  public resultado: number;
  public totalCalculo:number;

  constructor(){
    this.precioDolar = 4000;
    this.cantidad= 0;
  }

  public items: Array<any> = [
    {
       nombre: 'BItcoin',
       precio: 9000,
       precioCol: 36000000,
       cantidad: 0,
       totalUSD: 0,
       totalCOL: 0,
       resultadoTotal:0
    },
    {
      nombre: 'Ether',
      precio: 250,
      precioCol: 850000,
      cantidad: 0,
      totalUSD: 0,
      totalCOL: 0,
      resultadoTotal:0 
   }
];

ngDoCheck(){
  let suma = 0;
  for (let index = 0; index < this.items.length; index++) {
   suma = suma + this.items[index].resultadoTotal;
  }
  this.totalCalculo = suma;
}

getCalculation(cantidad:number, precio:number, index:number){ 
    this.items[index].resultadoTotal = cantidad*precio;
}
}
