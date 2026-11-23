import { Producto } from './producto.model';

/** Espejo de BodegaDto del backend (GET /bodegas): incluye sus productos. */
export interface Bodega {
  id: number;
  nombre: string;
  ubicacion: string;
  productos: Producto[];
}

/** Datos para registrar una bodega: el backend genera el id y no hay productos aún. */
export type NewBodega = Omit<Bodega, 'id' | 'productos'>;
