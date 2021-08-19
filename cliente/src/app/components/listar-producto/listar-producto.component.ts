import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor( private _productoService: ProductoService,
               private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }


  // OBTENER PRODUCTOS
  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      // console.log(data); 
      this.listProductos = data;
    }, error => {
      // console.log(error);
    })
  }

  // ELIMINAR PRODUCTOS
  eliminarProductos(id: any) {
    this._productoService.eliminarProductos(id).subscribe(data => {
      this.toastr.error('Producto eliminado con exito!', 'Producto Eliminado!');
      this.obtenerProductos();
    }, error => {
      // console.log(error);
    })
  }


}
