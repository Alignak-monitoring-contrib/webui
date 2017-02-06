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
    console.log(offset);
    this._httpService.getPage('host', '{"_is_template":false}', null, null, null, (offset + 1), limit)
      .subscribe(
        data => this.parsePage(data)
      );
  }

  parsePage(data) {
    this.count = data['_meta']['total'];
    let rows = [...this.rows];

    let i = (data['_meta']['page'] - 1) * data['_meta']['max_results'];
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
