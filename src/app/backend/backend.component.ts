/**
 * Created by ddurieux on 2/4/17.
 */
import {Component} from '@angular/core';
import {BackendService} from "./backend.service";

@Component({
  selector: 'backend',
  template: `
  <button (click)="onHostGet()">Get host list</button><br/>
  
  
<md-list>
  <h3 md-subheader>Hosts</h3>
  <md-list-item *ngFor="let host of getData">
    <h4 md-line>{{host.name}}</h4>
    <p md-line> {{host.address}} </p>
  </md-list-item>
</md-list>
  `,
  providers: [BackendService]
})

export class BackendComponent {
  getData: string;

  constructor(private _httpService: BackendService) {}

  onHostGet() {
    this._httpService.getHosts()
      .subscribe(
        data => this.getData = data['_items']
      );
  }
}
