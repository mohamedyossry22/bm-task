import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ConvertFilter, DateRangeCurrency } from '../../models/DTOs';
import { CurrencyService } from '../../services/currency.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'day','amount', 'from' ,'to' , 'result'];
  displayedColumnsCompere: string[] = ['Amount','from' ,'to' , 'result'];
  dataSource:any;
  dataSourceCompere:any;


  selectedSymbolsModel:any
  convertResult!:any;
  dateFilterForm!:FormGroup;
  symbols:any= [];
  detailsMode:boolean = false
  queryData:any ;
  fromFullName:string = ''
  toFullName:string = ''
  constructor(private service:CurrencyService , private fb:FormBuilder , private route:ActivatedRoute) {
    this.createForm()
    this.route.queryParams.subscribe((queryResult:any) => {
      if(Object.keys(queryResult).length > 0) {
        this.detailsMode = true
        this.queryData = queryResult
        this.dateFilterForm.get('base')?.setValue(queryResult['from'])
        this.dateFilterForm.get('symbols')?.setValue(queryResult['to'])
        this.service.convertResults.subscribe(res => {
          this.convertResult = res;
        })
      }
    })

  }

  ngOnInit(): void {
   
  }

  getSymbols(event:any) {
    this.symbols = event
    this.fromFullName = this.symbols.find((item:any) => item.value == this.queryData.from)
    this.toFullName = this.symbols.find((item:any) => item.value == this.queryData.to)
  }
  createForm() {
    this.dateFilterForm = this.fb.group({
      start_date:['', Validators.required],
      end_date:['' , Validators.required],
      base:['' , Validators.required],
      symbols:[ '' , Validators.required]
    })
  }

  getDateChanged(event:any) {
    if(this.dateFilterForm.controls['end_date'].valid) {
      this.dateFilterForm.value.start_date = this.changeDateFormat('start_date')
      this.dateFilterForm.value.end_date = this.changeDateFormat('end_date')
      this.getHistoricalDate()
    }
  }
  changeDateFormat(type: string) {
    let date = moment(this.dateFilterForm.value[type]).format('YYYY-MM-DD');
    return date;
  }
  getHistoricalDate() {
    this.service.dateRangeConvert(this.dateFilterForm.value).subscribe(res => {
      this.dataSource = this.datesMapping(res)
    })
  }



  compere() {
    this.service.compereSelectedValues(this.selectedSymbolsModel).subscribe(res => {
      this.dataSourceCompere = this.compereMapping(res)
    })
  }

  compereMapping(data:any) {
    return  Object.entries(data.rates).map(([key, value]) => {
      return {
        amount:1,
        from:this.convertResult?.query?.from,
        to:key,
        result:value ,
      }})
  }
  datesMapping(data:any) {
    return  Object.entries(data.rates).map(([key, value]:any) => {
      return {
        day:key,
        amount:1,
        to:Object.keys(value)[0] ,
        from:data.base,
        result:Object.values(value)[0]
      } 
    }) 
  } 

  getSelectedValues(event:any) {
    this.selectedSymbolsModel = {
      symbols : event.join(','),
      base:this.convertResult?.query?.from
    }
  }
  getControl(controlName:string) {
    return this.dateFilterForm.controls[controlName]
  }
}
