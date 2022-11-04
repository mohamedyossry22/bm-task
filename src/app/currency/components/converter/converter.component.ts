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
    
    this.route.queryParams.subscribe(res => {
      if(Object.keys(res).length !== 0) {
        this.convertCriteria = res
        this.createForm()
        this.convert()
      }else {
        this.createForm()
      }
    })
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
      this.resultData.fromFullName = this.symbols.find((item:any) => item.value == this.resultData.query.from)
    this.resultData.toFullName = this.symbols.find((item:any) => item.value == this.resultData.query.to)
    this.service.convertResults.next(this.resultData)
    })
    

    if(this.detailsMode){
      this.router.navigate(['.'], { relativeTo: this.route, queryParams: this.setQueryParams()})
    }
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
