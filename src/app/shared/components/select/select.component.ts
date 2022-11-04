import { Component, OnInit , Input} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() label:string = ""
  @Input() control:AbstractControl= new FormControl
  @Input() data = []
  @Input() disabled:boolean = false
  
  constructor() {
   }

  ngOnInit(): void {
  }

}
