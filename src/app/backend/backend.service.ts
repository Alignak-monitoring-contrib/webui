/**
 * Created by ddurieux on 2/4/17.
 */
import {Injectable} from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class BackendService {
  constructor(private _http: Http) {}

  getHosts() {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa("1486157026002-b9151cd2-cebd-458b-b07a-2e14f0db2999:"));
    return this._http.get('http://127.0.0.1:5000/host', {headers: headers})
      .map(res => res.json());

  }

  // need add getpage, getitem, getall, postitem, patchitem, deleteall, deleteitem

}
