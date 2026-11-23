import { Component, OnInit, inject, signal } from '@angular/core';
import { Bodega } from './models/bodega.model';
import { BodegaService } from './services/bodega.service';
import { BodegaFormComponent } from './bodegas/bodega-form/bodega-form.component';
import { ProductoTableComponent } from './bodegas/producto-table/producto-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BodegaFormComponent, ProductoTableComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private service = inject(BodegaService);

  bodegas = signal<Bodega[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.load();
  }

  /** Consulta GET /bodegas: nada está fijo en el frontend. */
  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.service.list().subscribe({
      next: (data) => {
        this.bodegas.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar la información. Verifica que el backend esté en ejecución (puerto 8080).');
        this.loading.set(false);
      },
    });
  }
}
