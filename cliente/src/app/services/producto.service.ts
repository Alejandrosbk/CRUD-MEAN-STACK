import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  // METODO PARA CONECTARSE A LA API DESDE ANGULAR E IMPORTAR EL BACK
  url = 'http://localhost:4000/api/productos/';

  constructor( private http: HttpClient ) { }

  // PETICION ASINCRONA PARA INGRESAR A LA URL
  getProductos(): Observable<any> {
    return this.http.get(this.url);
  }

  // METODO PARA ELIMINAR PRODUCTO 
  eliminarProductos(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }

  // METODO PARA GUARDAR PRODUCTO
  guardarProductos(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto);
  }

  // METODO PARA CAPTURAR LOS DATOS PARA SU EDICION
  capturarProductos(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  // METODO QUE MODIFICA LOS DATOS Y LOS GUARDA YA ACTUALIZADOS
  editarProductos(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.url + id, producto);
  }

}
