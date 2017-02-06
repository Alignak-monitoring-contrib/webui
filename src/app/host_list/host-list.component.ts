import { Component, TemplateRef, ViewChild } from '@angular/core';
import { BackendService } from "../backend/backend.service";

@Component({
  //selector: 'currently',
  templateUrl: 'host-list.component.html',
  providers: [ BackendService ]
})
export class HostListComponent {
  @ViewChild('stateTpl') stateTpl: TemplateRef<any>;
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 10;
  sort = 'name';
  columns = [];

  constructor(private _httpService: BackendService) {}


  ngOnInit() {
    this.page(this.offset, this.limit);

    this.columns = [
      {
        name: 'Status',
        prop: 'ls_state',
        width: 80,
        maxWidth: 80,
        canAutoResize: false,
        cellTemplate: this.stateTpl
      },
      {
        name:'Name',
        prop: 'name'
      },
      {
        name:'Address',
        prop: 'address'
      }
    ];
  }

  page(offset, limit) {
    this._httpService.getPage('host', '{"_is_template":false}', null, null, this.sort, (offset + 1), limit)
      .subscribe(
        data => this.parsePage(data)
      );
  }

  onSort(event) {
    console.log('Sort Event', event);
    if (event['sorts'][0]['dir'] == 'asc') {
      this.sort = event['sorts'][0]['prop'];
    } else {
      this.sort = '-' + event['sorts'][0]['prop'];
    }
    this.page(this.offset, this.limit);
  }

  parsePage(data) {
    this.count = data['_meta']['total'];
    let rows = [...this.rows];

    let i = (data['_meta']['page'] - 1) * data['_meta']['max_results'];
    for (var item of data['_items']) {
      let state = 'ok';
      if (item['ls_state'] == 'DOWN') {
        state = 'critical';
      }
      rows[i] = {name: item['name'], address: item['address'], ls_state: state};
      i++;
    }
    this.rows = rows;
  }

  onPage(event) {
    console.log('Page Event', event);
    this.page(event.offset, event.limit);
  }
}
