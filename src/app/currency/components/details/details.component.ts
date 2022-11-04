import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  convertResult!:any;
  constructor(private service:CurrencyService) {
    this.service.convertResults.subscribe(res => {
      if(Object.keys(res).length !== 0) {
        this.convertResult = res
      }
    })
  }

  ngOnInit(): void {
  }

}
