import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "8TJk5jC8akT4BThr2mzvCeQFBJHSkSXO";
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!) ;
    // }
  }

  get historial(){
    return [...this._historial]
  }

  buscarGifs(query: string = ''){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=8TJk5jC8akT4BThr2mzvCeQFBJHSkSXO&q=${query}&limit=10`)
      .subscribe((resp: SearchGifsResponse) =>{
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      })

    this._historial = this._historial.splice(0,10);
    localStorage.setItem('historial',JSON.stringify(this._historial));
  }
}
