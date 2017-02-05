import { Component } from '@angular/core';
import { BackendService } from "../backend/backend.service";

@Component({
  //selector: 'currently',
  templateUrl: 'host-list.component.html',
  providers: [ BackendService ]
})
export class HostListComponent {
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  constructor(private _httpService: BackendService) {}

  ngOnInit() {
    this.page(this.offset, this.limit);
  }

  page(offset, limit) {
    // todo: manage pages
    this._httpService.getHosts()
      .subscribe(
        data => this.parsePage(data)
      );
  }

  parsePage(data) {
    this.count = data['_meta']['total'];
    console.log(this.count);

    let rows = [];

    let i = 0;
    for (var item of data['_items']) {
      rows[i] = {name: item['name'], address: item['address'], lsstate: item['ls_state']};
      i++;
    }
    this.rows = rows;
  }

  onPage(event) {
    console.log('Page Event', event);
    this.page(event.offset, event.limit);
  }
}
