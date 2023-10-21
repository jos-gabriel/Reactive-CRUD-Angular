import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../domain/categoria';
import { Producto } from '../domain/producto';

@Component({
  selector: 'jghp-app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
})
export class FormularioProductoComponent implements OnInit, OnChanges {
  @Input() modo: 'agregar' | 'editar' | 'eliminar';
  @Input() categorias: Categoria[];
  @Input() producto: Producto;
  @Input() titulo: string;

  @Output() guardar = new EventEmitter<Producto>();
  @Output() eliminar = new EventEmitter<number>();
  @Output() regresarClick = new EventEmitter<void>();

  disableButton: Boolean = false;
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      id: [null],
      nombre: ['', [Validators.required, Validators.maxLength(250)]],
      marca: ['', [Validators.required, Validators.maxLength(100)]],
      modelo: ['', [Validators.required, Validators.maxLength(100)]],
      precio: ['', [Validators.required, Validators.min(0), Validators.max(999999999)]],
      descuento: [''],
      categoriaId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  ngOnChanges() {
    if (this.modo === 'editar' && this.producto) {
      this.inicializarFormulario();
    } else if (this.modo === 'eliminar' && this.producto) {
      this.inicializarFormulario();
      this.formulario.disable();
    }
  }

  inicializarFormulario() {
    this.formulario.setValue({
      id: this.producto ? this.producto.id : '',
      nombre: this.producto ? this.producto.nombre : '',
      marca: this.producto ? this.producto.marca : '',
      modelo: this.producto ? this.producto.modelo : '',
      precio: this.producto ? this.producto.precio : '',
      descuento: this.producto ? this.producto.descuento : '',
      categoriaId: this.producto ? this.producto.categoriaId : '',
    });
  }

  regresar() {
    this.regresarClick.emit();
  }

  generarDescuentoAleatorio(): number {
    const descuentoPorcentaje = (Math.floor(Math.random() * 12) + 15) / 100;
    const descuentoConDecimal = Math.round(descuentoPorcentaje * 10) / 10;
    return descuentoConDecimal;
  }

  generaridAleatorio(): number{
    const idAleatorio = Math.floor(Math.random() * 1000);
    return idAleatorio;
  }


  onSubmit() {
    this.formulario.enable();
    if (this.formulario.valid) {
      if (this.modo === 'agregar') {
        const idAleatorio = this.generaridAleatorio();
        const descuentoAleatorio = this.generarDescuentoAleatorio();
        const productoAGuardar = {
          ...this.formulario.value,
          id: idAleatorio,
          descuento: descuentoAleatorio,
          categoriaId: Number(this.formulario.value.categoriaId)
        };
        this.guardar.emit(productoAGuardar);
      } else if (this.modo === 'editar') {
        const descuentoAleatorio = this.generarDescuentoAleatorio();
        const productoEditado = {
          ...this.formulario.value,
          descuento: descuentoAleatorio,
          categoriaId: Number(this.formulario.value.categoriaId)
        };
        this.guardar.emit(productoEditado);
      } else if (this.modo === 'eliminar' && this.producto) {
        this.disableButton = true;
        this.formulario.disable();
        this.eliminar.emit(this.producto.id);
      }
    }
  }
}
