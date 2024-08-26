# CRUD API con Node.js y MySQL

Una API RESTful básica para realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre una base de datos MySQL utilizando Node.js y el framework Express. Incluye configuración con Docker para facilitar la ejecución en contenedores.

## Requisitos

- Docker
- Docker Compose
- Node.js (para pruebas locales, si no estás usando Docker)

## Instalación

### Con Docker

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/cristianhar/Node-Mysql-Docker.git

2. **Instala Node_Modules**:
    ```bash
    npm init 
    
3. **Construye y ejecuta los contenedores:**:
    ```bash
    docker-compose up --build

- Esto construirá la imagen del contenedor de Node.js y levantará los servicios de MySQL y Node.js. La aplicación estará disponible en http://localhost:3000.  

## Uso de la API

### Consultar Todos los Registros

- **Endpoint**: `GET /`
- **Descripción**: Obtiene todos los registros de la tabla `personas`.
- **Ejemplo de uso**:
  - **URL**: [http://localhost:3000/](http://localhost:3000/)
- **Respuesta esperada**: Un JSON con todos los registros de la tabla `personas`.

### Agregar un Nuevo Registro

- **Endpoint**: `GET /agregar`
- **Descripción**: Agrega una nueva persona a la tabla `personas`.
- **Parámetros**:
  - `nombre`: El nombre de la persona.
  - `edad`: La edad de la persona.
  - `ciudad`: La ciudad de la persona.
- **Ejemplo de uso**:
  - **URL**: [http://localhost:3000/agregar?nombre=Luis&edad=40&ciudad=Sevilla](http://localhost:3000/agregar?nombre=Luis&edad=40&ciudad=Sevilla)
- **Respuesta esperada**: "Persona agregada"

### Actualizar un Registro Existente

- **Endpoint**: `GET /actualizar`
- **Descripción**: Actualiza una persona existente en la tabla `personas`.
- **Parámetros**:
  - `id`: El ID del registro a actualizar.
  - `nombre`: El nuevo nombre de la persona.
  - `edad`: La nueva edad de la persona.
  - `ciudad`: La nueva ciudad de la persona.
- **Ejemplo de uso**:
  - **URL**: [http://localhost:3000/actualizar?id=1&nombre=Luis&edad=41&ciudad=Granada](http://localhost:3000/actualizar?id=1&nombre=Luis&edad=41&ciudad=Granada)
- **Respuesta esperada**: "Persona actualizada"

### Borrar un Registro

- **Endpoint**: `GET /borrar`
- **Descripción**: Elimina un registro de la tabla `personas`.
- **Parámetros**:
  - `id`: El ID del registro a eliminar.
- **Ejemplo de uso**:
  - **URL**: [http://localhost:3000/borrar?id=1](http://localhost:3000/borrar?id=1)
- **Respuesta esperada**: "Persona borrada"
