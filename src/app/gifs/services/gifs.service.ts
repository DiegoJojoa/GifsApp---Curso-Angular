import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = "8TJk5jC8akT4BThr2mzvCeQFBJHSkSXO";
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo correspondiente
  public resultados: any[] = [];

  constructor(private http: HttpClient){}

  get historial(){
    return [...this._historial]
  }

  buscarGifs(query: string = ''){
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=8TJk5jC8akT4BThr2mzvCeQFBJHSkSXO&q=${query}&limit=10`)
      .subscribe((resp: any) =>{
        console.log(resp.data);
        this.resultados = resp.data;
      })

    this._historial = this._historial.splice(0,10);
    console.log(this._historial);
  }
}
