import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Bodega } from '../../models/bodega.model';
import { FilaTabla } from '../../models/producto.model';

@Component({
  selector: 'app-producto-table',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './producto-table.component.html',
})
export class ProductoTableComponent {
  filas: FilaTabla[] = [];
  totalBodegas = 0;
  totalProductos = 0;

  /** Los datos bajan: recibe las bodegas (con productos) y las aplana en filas. */
  @Input({ required: true }) set bodegas(value: Bodega[]) {
    this.totalBodegas = value.length;
    this.totalProductos = value.reduce((total, b) => total + b.productos.length, 0);
    // Una fila por producto; la bodega sin productos genera una fila con producto = null.
    this.filas = value.flatMap((b): FilaTabla[] =>
      b.productos.length > 0
        ? b.productos.map((p) => ({ clave: `p${p.id}`, bodega: b.nombre, producto: p }))
        : [{ clave: `b${b.id}`, bodega: b.nombre, producto: null }]
    );
  }
}