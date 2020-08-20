import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() FullMode: boolean; // Fullscreen?
  Enable: boolean; // Fullscreen? 
  constructor(
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.Enable = true
    this.spinner.show();
  } 

}
