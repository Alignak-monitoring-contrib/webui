import { Component } from '@angular/core';
import {BackendService} from "../backend/backend.service";
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'overall',
  templateUrl: './overall.component.html',
  providers: [BackendService]
})
export class OverallComponent {
  host_up = 0;
  host_unreachable = 0;
  host_down = 0;
  host_acknowledged = 0;
  host_in_downtime = 0;

  service_ok = 0;
  service_warning = 0;
  service_critical = 0;
  service_unknown = 0;
  service_unreachable = 0;
  service_acknowledged = 0;
  service_in_downtime = 0;

  constructor(private _httpService: BackendService) {}


  ngOnInit() {
    Observable.interval(30000)
      .startWith(1)
      .mergeMap(() => this._httpService.getAll('livesynthesis'))
        .subscribe(
          data => this.parseLiveState(data['_items'])
        )
  }

  parseLiveState(data) {
    // Reinitialize values for the refresh livestate
    this.host_up = 0;
    this.host_unreachable = 0;
    this.host_down = 0;
    this.host_acknowledged = 0;
    this.host_in_downtime = 0;

    this.service_ok = 0;
    this.service_warning = 0;
    this.service_critical = 0;
    this.service_unknown = 0;
    this.service_unreachable = 0;
    this.service_acknowledged = 0;
    this.service_in_downtime = 0;

    for (var item of data) {
      this.host_up += item['hosts_up_hard'];
      this.host_unreachable += item['hosts_unreachable_hard'];
      this.host_down += item['hosts_down_hard'];
      this.host_acknowledged += item['hosts_acknowledged'];
      this.host_in_downtime += item['hosts_in_downtime'];

      this.service_ok += item['services_ok_hard'];
      this.service_warning += item['services_warning_hard'];
      this.service_critical += item['services_critical_hard'];
      this.service_unknown += item['services_unknown_hard'];
      this.service_unreachable += item['services_unreachable_hard'];
      this.service_acknowledged += item['services_acknowledged'];
      this.service_in_downtime += item['services_in_downtime'];
    }
  }

}
