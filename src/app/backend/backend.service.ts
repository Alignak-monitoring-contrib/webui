/**
 * Created by ddurieux on 2/4/17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map'

@Injectable()
export class BackendService {
  token = '1484558366922-bcf7ccf1-7238-487b-abd9-30ced7e426fb';
  backend_url = 'http://demo.alignak.net:5010';

  constructor(private _http: Http) {}


  doLogin() {
    this._http.post(this.backend_url + '/login', {username: 'admin', password: 'admin'})
      .map(res => res.json())
      .subscribe(token => this.token = token['token']);
  }

  getHosts() {
    if (this.token == '') {
      this.doLogin();
    }

    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.token + ":"));
    let params = new URLSearchParams();
    params.set('where', '{"_is_template":false}');
    return this._http.get(this.backend_url + '/host', {headers: headers, search: params})
      .map(res => res.json());

  }

  getAll(endpoint) {
    if (this.token == '') {
      this.doLogin();
    }

    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.token + ":"));
    //headers.append("Cache-control", "no-cache");
    //headers.append('Cache-control', 'no-store');
    headers.append('Cache-Control', 'max-age=20');
    //headers.append('Expires', '0');
    //headers.append("Pragma", "no-cache");
    return this._http.get(this.backend_url + '/' + endpoint, {headers: headers})
      .map(res => res.json());

  }

  /** Get only a page with all parameters possible */
  getPage(endpoint, where=null, projection=null, embedded=null, sort=null, page=1, max_results=25) {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.token + ":"));
    // define a cache of 10 seconds
    headers.append('Cache-Control', 'max-age=10');
    // manage params
    let params: URLSearchParams = new URLSearchParams();
    if (where != null) {
      params.set('where', where);
    }
    if (projection != null) {
      params.set('projection', projection);
    }
    if (embedded != null) {
      params.set('embedded', embedded);
    }
    if (sort != null) {
      params.set('sort', sort);
    }
    params.set('page', page.toString());
    params.set('max_results', max_results.toString());

    return this._http.get(this.backend_url + '/' + endpoint, {headers: headers, search: params})
      .map(res => res.json());
  }

  // need add getpage, getitem, getall, postitem, patchitem, deleteall, deleteitem

}
