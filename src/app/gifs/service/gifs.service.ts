import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'X5nSp2RqIxQBpQK8RkTtHfFZVSIaVLMh';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    /* if( localStorage.getItem( 'historial' ) ){
      this._historial = JSON.parse( localStorage.getItem( 'historial' )! );
    } */

    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || [];

  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {

      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
      localStorage.setItem('resultado', JSON.stringify(this.resultados));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=X5nSp2RqIxQBpQK8RkTtHfFZVSIaVLMh&q=${ query }&limit=10`)
    .subscribe( (resp) => {
      this.resultados = resp.data;
    })
  }
}
