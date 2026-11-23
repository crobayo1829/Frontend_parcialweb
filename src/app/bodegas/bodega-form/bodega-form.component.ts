import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bodega, NewBodega } from '../../models/bodega.model';
import { BodegaService } from '../../services/bodega.service';

@Component({
  selector: 'app-bodega-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bodega-form.component.html',
})
export class BodegaFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(BodegaService);

  /** Los eventos suben: avisa al padre que se registró una bodega. */
  @Output() created = new EventEmitter<Bodega>();

  saving = signal(false);
  success = signal('');
  error = signal('');

  // Pasos 1 y 2: controles y validadores (pattern /\S/ rechaza textos solo con espacios)
  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    ubicacion: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(150)]],
  });

  submit(): void {
    this.success.set('');
    this.error.set('');

    // Paso 5: validar al enviar
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Paso 6: construir el modelo y delegar al servicio
    const raw = this.form.getRawValue();
    const bodega: NewBodega = {
      nombre: raw.nombre.trim(),
      ubicacion: raw.ubicacion.trim(),
    };

    this.saving.set(true);
    this.service.create(bodega).subscribe({
      next: (created) => {
        this.saving.set(false);
        this.success.set(`Bodega «${created.nombre}» registrada correctamente.`);
        this.form.reset();
        this.created.emit(created);
      },
      error: (err) => {
        this.saving.set(false);
        this.error.set(
          err.status === 0
            ? 'No hay conexión con el backend. Verifica que esté ejecutándose en el puerto 8080.'
            : 'No fue posible registrar la bodega.'
        );
      },
    });
  }
}
