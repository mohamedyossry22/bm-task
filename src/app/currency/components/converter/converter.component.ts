import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConvertResult } from '../../models/DTOs';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  convertForm!:FormGroup
  constructor(private service:CurrencyService , private fb:FormBuilder) { }
  resultData!:ConvertResult;
  symbols:any;
  ngOnInit(): void {
    this.getSymbols()
    this.createForm()
  }


  createForm() {
    this.convertForm = this.fb.group({
      amount:['' , Validators.required],
      from:['' , Validators.required],
      to:['' , Validators.required]
    })
  }


  getSymbols() {
    this.service.getAllSymbols().subscribe(res => {
      this.symbols = this.SymbolsMapping(res)
    } ) 
  }

  convert() {
    this.service.convertCurrency(this.convertForm.value).subscribe((res:ConvertResult) => {
      this.resultData = res
      this.resultData.result = +this.resultData.result.toFixed(2)
    })
  }

  swap() {
    let to = this.convertForm.value['to'],
        from = this.convertForm.value['from'];
    this.convertForm.get('to')?.setValue(from)
    this.convertForm.get('from')?.setValue(to)
    this.convert()
  }

  SymbolsMapping(data:object) {
   let allSymblos:object[]  = []
    Object.entries(data).forEach(([key , value]) => {
      allSymblos.push({value :key , name : value})
    })
    return allSymblos
  }



  getControl(controlName:string) {
    return this.convertForm.controls[controlName]
  }
}
