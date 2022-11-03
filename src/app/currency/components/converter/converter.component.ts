import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  constructor(private service:CurrencyService , private toast:ToastrService) { }

  symbols:any;
  ngOnInit(): void {
    this.getSymbols()
  }

  getSymbols() {
    this.service.getAllSymbols().subscribe(res => {
      
      this.symbols = this.SymbolsMapping(res)
    } ) 
  }


  SymbolsMapping(data:object) {
   let allSymblos:object[]  = []
    Object.entries(data).forEach(([key , value]) => {
      allSymblos.push({value :key , name : value})
    })
    return allSymblos
  }
}
