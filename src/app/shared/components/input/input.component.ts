import { Component, OnInit , Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label:string = ""
  @Input() type:string = ""
  @Input() placeholder:string = ""
  @Input() control:AbstractControl = new FormControl
  constructor() { }

  ngOnInit(): void {
  }

}
