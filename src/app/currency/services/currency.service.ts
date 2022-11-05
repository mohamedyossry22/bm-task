import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConvertFilter, ConvertResult, Symbols } from '../models/DTOs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  convertResults = new BehaviorSubject<ConvertResult>({} as ConvertResult);
  symbols = new BehaviorSubject([{}]);
  constructor(private http:HttpClient) { }

  getAllSymbols():Observable<Symbols> {
    return this.http.get(environment.baseApi + '/symbols').pipe(map((res:any) => res.symbols))
  }

  convertCurrency(model:ConvertFilter):Observable<ConvertResult> {
    let params = new HttpParams();
    Object.entries(model).forEach(([key , value]) =>{
      params = params.set(key , value)
    })
    return this.http.get(environment.baseApi + '/convert' , {params}).pipe(map((res:any) => res  ))
  }

  dateRangeConvert(model:object) {
    let params = new HttpParams();
    Object.entries(model).forEach(([key , value]) =>{
      params = params.set(key , value)
    })
    return this.http.get(environment.baseApi+'/timeseries', {params})
  }

  compereSelectedValues(model:object) {
    let params = new HttpParams();
    Object.entries(model).forEach(([key , value]) =>{
      params = params.set(key , value)
    })
    return this.http.get(environment.baseApi+'/latest', {params})
  }
}
