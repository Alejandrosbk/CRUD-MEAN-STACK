import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = "Crear producto";
  // VARIABLE PARA CAPTURAR EL ID QUE SE VA A EDITAR
  id: string | null;

  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private toastr: ToastrService,
               private _productoService: ProductoService,
               private aRouter: ActivatedRoute ) {
    this.productoForm = this.formBuilder.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.editarProducto();
  }

  agregarProducto() {
    // console.log(this.productoForm.value);
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }

    // condicion para que se edite en vez de agregarse
    if(this.id !== null) {
      // EDITAMOS PRODUCTO
      this._productoService.editarProductos(this.id, PRODUCTO).subscribe(data => {
        this.toastr.info('Producto actualizado con exito!', 'Producto Actualizado!');
        this.router.navigate(['/']);
      }, error => {
        // console.log(error);
        this.productoForm.reset();
      })

    } else {
      // AGREGAMOS PRODUCTO
        // console.log(PRODUCTO);
      this._productoService.guardarProductos(PRODUCTO).subscribe(data => {
        this.toastr.success('Producto creado con exito!', 'Producto Guardado!');
        this.router.navigate(['/']);
      }, error => {
        // console.log(error);
        this.productoForm.reset();
      })
    }

  }


  editarProducto(){
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.capturarProductos(this.id).subscribe(data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      }
    )}
  }
}
