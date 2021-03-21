import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

declare function customInitFunction();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private swUpdate: SwUpdate) {

  }
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }
}
customInitFunction();