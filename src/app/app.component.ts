import { Component, OnInit } from '@angular/core';
import { AlertService } from './shared/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  alert: AlertService | undefined;
  autoClose: number = 3;
  message: string = `Alert message goes here\nAnother line maybe ?`;

  constructor(alertService: AlertService) {
    this.alert = alertService;
  }

  ngOnInit() {}

  success(): void {
    this.alert?.success(`${this.message}`, {
      autoClose: this.toMillisec(this.autoClose),
    });
  }

  info(): void {
    this.alert?.info(`${this.message}`, {
      autoClose: this.toMillisec(this.autoClose),
    });
  }

  warning(): void {
    this.alert?.warn(`${this.message}`, {
      autoClose: this.toMillisec(this.autoClose),
    });
  }

  error(): void {
    this.alert?.error(`${this.message}`, {
      autoClose: this.toMillisec(this.autoClose),
    });
  }

  toMillisec(second: number): number {
    return second * 1000 || 0;
  }

  // Example
  doSomethingFunction() {
    let youSuccessSomething = true;
    if (youSuccessSomething) {
      let howManySecondUntilAlertClose = 3;
      this.alert?.success('this is where you put a message', {
        autoClose: howManySecondUntilAlertClose, // 0 or leave blank to disable
      });
    }

    let somethingError = true;
    if (somethingError) {
      this.alert?.error('this is where you put a message');
      // no autoClose
    }
  }
}
