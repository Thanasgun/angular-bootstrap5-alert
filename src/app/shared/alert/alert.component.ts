import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  alertSubscription!: Subscription;

  constructor(private router: Router, private alertService: AlertService) {
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        // clear alerts when an empty alert is received
        if (!alert.message) return;

        // add alert to array
        this.alerts.push(alert);

        // auto close alert if required
        if (alert.autoClose && alert.autoClose > 0) {
          let millisecond = alert.autoClose;
          setTimeout(() => this.removeAlert(alert), millisecond);
        }
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    const timeout = this.fade ? 250 : 0;
    alert.fade = this.fade;

    setTimeout(() => {
      this.alerts = this.alerts.filter((x) => x !== alert);
    }, timeout);
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissible'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning',
    };

    if (alert.type !== undefined) {
      classes.push(alertTypeClass[alert.type]);
    }

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }
}
