
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CoreService {
  constructor( private toaster:ToastrService ) { }

  errorToaster(message?:string) {
    this.toaster.error( message , "Error", {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut:5000,
      closeButton: true,
    } )
  }

  successToaster(message?:string) {
    this.toaster.success( message , "Success", {
      disableTimeOut: false,
      titleClass: "toastr_title",
      messageClass: "toastr_message",
      timeOut:5000,
      closeButton: true,
    } )
  }

}
