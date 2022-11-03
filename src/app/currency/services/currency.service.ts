import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http:HttpClient) { }

  getAllSymbols() {
    return this.http.get(environment.baseApi + '/symbols').pipe(map((res:any) => res.symbols))
  }
}
