# CSV Uploader

Aplicación Full Stack que permite a usuarios administradores cargar archivos CSV para la creación masiva de registros en una base de datos PostgreSQL, con validación de datos y corrección de errores en tiempo real.

## Tecnologías

**Backend**

- Node.js + Express + TypeScript
- PostgreSQL
- JWT en cookies HttpOnly
- Multer + csv-parse
- Zod
- Vitest + Supertest

**Frontend**

- React + TypeScript + Vite
- React Router DOM
- Tailwind CSS
- Vitest + Testing Library

## Requisitos previos

- Node.js 18+
- PostgreSQL 14+
- npm 9+

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/JuanCosco/csv-uploader.git
cd csv-uploader
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crea el archivo `.env` en `backend/`:

```env
DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/csv_uploader
JWT_SECRET=supersecretkey
PORT=3000
```

### 3. Configurar la Base de Datos

Crea la base de datos:

```bash
psql -U postgres
```

```sql
CREATE DATABASE csv_uploader;
\q
```

Ejecuta la migración y el seed:

```bash
psql -U postgres -d csv_uploader -f src/db/migration.sql
psql -U postgres -d csv_uploader -f src/db/seed.sql
```

Esto creará la tabla `users` y un usuario administrador con las siguientes credenciales:

| Campo    | Valor           |
| -------- | --------------- |
| Email    | admin@admin.com |
| Password | password        |

### 4. Configurar el Frontend

```bash
cd ../frontend
npm install
```

Crea el archivo `.env` en `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

## Ejecución

### Backend

```bash
cd backend
npm run dev
```

El servidor estará disponible en `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Tests

### Backend

```bash
cd backend
npm run test
```

### Frontend

```bash
cd frontend
npm run test
```

## Uso

1. Accede a `http://localhost:5173/login`
2. Inicia sesión con las credenciales del administrador
3. Selecciona un archivo CSV con las columnas `name`, `email`, `age`
4. Haz click en **Upload File**
5. Revisa los resultados — registros exitosos y filas con errores
6. Corrige las filas con error directamente en la interfaz y haz click en **Retry**

### Formato del CSV

```csv
name,email,age
Juan Perez,juan@example.com,28
Maria Garcia,maria@example.com,
```

| Campo | Tipo    | Requerido | Validación                               |
| ----- | ------- | --------- | ---------------------------------------- |
| name  | string  | ✅        | No puede estar vacío                     |
| email | string  | ✅        | Formato válido de email                  |
| age   | integer | ❌        | Número entero positivo si se proporciona |

## URLs de Producción

| Servicio | URL                   |
| -------- | --------------------- |
| Frontend | _Pendiente de deploy_ |
| Backend  | _Pendiente de deploy_ |

## Estructura del Proyecto

```
csv-uploader/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── schemas/
│   │   ├── db/
│   │   └── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   └── tests/
│   └── package.json
└── README.md
```
