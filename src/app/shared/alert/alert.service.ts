import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType, AlertOptions } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  // enable subscribing to alerts observable
  onAlert(id = this.defaultId): Observable<Alert> {
    console.log('service onAlert');
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  // convenience methods
  async success(_message: string, options?: AlertOptions): Promise<void> {
    let currentDate = new Date();
    let message = `
            <h5 class="alert-heading">Success</h5>
            <hr/>
            <pre><span>${_message}</span></pre>
            <small>${currentDate}</small>
          `;
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  async error(_message: string, options?: AlertOptions): Promise<void> {
    let currentDate = new Date();
    let message = `
            <h5 class="alert-heading">Error</h5>
            <hr/>
            <pre><span>${_message}</span></pre>
            <small>${currentDate}</small>
          `;
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  async info(_message: string, options?: AlertOptions): Promise<void> {
    let currentDate = new Date();
    let message = `
            <h5 class="alert-heading">Info</h5>
            <hr/>
            <pre><span>${_message}</span></pre>
            <small>${currentDate}</small>
          `;
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  async warn(_message: string, options?: AlertOptions): Promise<void> {
    let currentDate = new Date();
    let message = `
            <h5 class="alert-heading">Warning</h5>
            <hr/>
            <pre><span>${_message}</span></pre>
            <small>${currentDate}</small>
          `;
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // main alert method
  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  clear(id = this.defaultId) {
    this.subject.next(new Alert({ id }));
  }

  getSubject(): any {
    return this.subject;
  }
}
