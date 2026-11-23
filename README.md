# Frontend_parcialweb (bodegas-frontend)

Interfaz web del **Sistema de bodegas y productos**.
Permite **registrar bodegas** y **consultar los productos con su bodega** consumiendo la API del repositorio
[`Backend_parcialweb`](https://github.com/crobayo1829/Backend_parcialweb). No hay información fija: todo viene de `GET /bodegas`.

- **Stack:** Angular 20 (componentes standalone) · TypeScript · Formularios reactivos · HttpClient
- **Backend requerido:** `Backend_parcialweb` ejecutándose en `http://localhost:8080`

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js     | 20.19+ , 22.12+ o 24+ (`node -v`) |
| npm         | incluido con Node (`npm -v`) |

## Cómo ejecutarlo

1. **Levantar primero el backend** (ver el README de `Backend_parcialweb`): `mvn spring-boot:run`.
2. Instalar dependencias y arrancar el frontend:

```bash
git clone https://github.com/crobayo1829/Frontend_parcialweb.git
cd Frontend_parcialweb
npm install
npm start          # equivale a: ng serve
```

3. Abrir **http://localhost:4200**.

### Otros comandos

| Comando         | Qué hace |
|-----------------|----------|
| `npm run build` | Compila para producción en `dist/` |
| `npm start`     | Servidor de desarrollo con recarga automática |

### Cambiar la URL del backend

La URL está en un único lugar: `src/app/services/bodega.service.ts` (propiedad `url`).
El backend ya habilita CORS para `http://localhost:4200`.

## Estructura

```
src/app
├── models/
│   ├── bodega.model.ts          Bodega y NewBodega (espejo de BodegaDto)
│   └── producto.model.ts        Producto y ProductoConBodega (fila de la tabla)
├── services/
│   └── bodega.service.ts        HttpClient: list() → GET /bodegas · create() → POST /bodegas
├── bodegas/
│   ├── bodega-form/             Componente: formulario de registro
│   └── producto-table/          Componente: tabla de productos con su bodega
├── app.component.*              Contenedor: carga los datos y conecta formulario ↔ tabla
├── app.config.ts                provideHttpClient(), localización es-CO (2.500.000)
└── app.routes.ts
```
