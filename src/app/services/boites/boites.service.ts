import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoitesService {
  private host : string = "http://localhost:8089";

  constructor(private http : HttpClient) { }

  getBoites(keyword : string, page: number=1, size:number=6) {
    return this.http.get(`${this.host}/boites?type_like=${keyword}&_page=${page}&_limit=${size}`,
     {observe:'response'});
  }

}
