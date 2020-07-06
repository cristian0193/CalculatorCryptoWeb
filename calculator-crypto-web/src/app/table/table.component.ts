import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {


  getCalculation(){ 
    $("#table-coin tbody tr").on("click", function(event){
      var priceDolar = parseFloat($(this).find("#priceDolar").html());
      var quantity = $(this).find('input[type="number"]').val();
      console.log(priceDolar);
      console.log(quantity);
      
      
      if (typeof quantity === "string") {
       var resultDolar = priceDolar * parseFloat(quantity);
       console.log(resultDolar);
       
      }
      event.stopImmediatePropagation();
    });
  }

}
