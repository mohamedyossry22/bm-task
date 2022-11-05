import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertResult } from '../../models/DTOs';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  @Input() detailsMode:boolean = false
  convertForm!:FormGroup;
  convertCriteria:any
  constructor(private service:CurrencyService , private fb:FormBuilder , private router:Router , private route:ActivatedRoute) {

    //get data from url query
    this.route.queryParams.subscribe(res => {
      if(Object.keys(res).length !== 0) {
        this.convertCriteria = res
        this.detailsMode = true
      }
    })

    //Fix Call Convert Function With each url change
    if(this.detailsMode) {
      this.createForm()
      this.convert()
    }else {
      this.createForm()
    }
   }
  resultData!:ConvertResult;
  @Output() symbolsOutside:any = new EventEmitter() ;
  symbols:any = [];
  ngOnInit(): void {
    this.getSymbols()
  }


  createForm() {
    this.convertForm = this.fb.group({
      amount:[this.convertCriteria?.amount || '' , Validators.required],
      from:[this.convertCriteria?.from || '' , Validators.required],
      to:[this.convertCriteria?.to || '' , Validators.required]
    })
  }


  getSymbols() {
    this.service.getAllSymbols().subscribe(res => {
      this.symbolsOutside.emit( this.SymbolsMapping(res))
      this.symbols = this.SymbolsMapping(res)
    } ) 
  }

  convert() {
    this.service.convertCurrency(this.convertForm.value).subscribe((res:ConvertResult) => {
      this.resultData = res
      this.resultData.result = +this.resultData.result.toFixed(2)
      this.service.convertResults.next(this.resultData)

      //update url query paranms with new selected data
      if(this.detailsMode || this.router.url == "/currency/details"){
        this.router.navigate(['.'], { relativeTo: this.route, queryParams: this.setQueryParams()})
        this.detailsMode = true
      }
    })
    

  }

  swap() {
    let to = this.convertForm.value['to'],
        from = this.convertForm.value['from'];
    //update Reactiove form after swip selected data
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


  navigate() {
    this.router.navigate(['/currency/details'] , { queryParams: this.setQueryParams() })
  }

  setQueryParams() {
    return { 
      amount: this.resultData.query.amount , 
      from: this.resultData.query.from , 
      to: this.resultData.query.to
    }
  }

  getControl(controlName:string) {
    return this.convertForm.controls[controlName]
  }
}
