export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}

/** Fila de la tabla: un producto con su bodega, o una bodega sin productos (producto = null). */
export interface FilaTabla {
  clave: string;
  bodega: string;
  producto: Producto | null;
}
