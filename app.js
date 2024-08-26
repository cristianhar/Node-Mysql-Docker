import express from "express";  // Importa el módulo Express para crear un servidor web.
import mysql from "mysql2/promise";  // Importa el módulo MySQL2 con soporte de promesas para conectarse a MySQL.

const app = express();  // Crea una instancia de la aplicación Express.
const port = 3000;  // Define el puerto en el que el servidor escuchará las solicitudes (3000).

async function iniciarServer() {
    let conn;  // Variable para almacenar la conexión a la base de datos.
    let intentos = 5;  // Número de intentos de reconexión en caso de fallo al conectarse a MySQL.

    while (intentos) {  // Bucle que intenta conectarse a MySQL hasta 5 veces.
        try {
            conn = await mysql.createConnection({
                host: 'mysql_db',  // Nombre del host de la base de datos.
                port: 3306,  // Puerto en el que MySQL está escuchando.
                user: 'root',  // Usuario para conectarse a MySQL.
                password: '12345',  // Contraseña para conectarse a MySQL.
                database: 'miapp'  // Nombre de la base de datos a la que se conectará.
            });
            break;  // Si la conexión es exitosa, se sale del bucle.
        } catch (error) {
            console.error('Error conectando a MySQL, reintentando...', error);  // Muestra un mensaje de error si la conexión falla.
            intentos -= 1;  // Decrementa el número de intentos restantes.
            await new Promise(resolve => setTimeout(resolve, 5000));  // Espera 5 segundos antes de intentar reconectar.
        }
    }

    if (!conn) {  // Si después de 5 intentos no se logra la conexión:
        console.error('No se pudo conectar a MySQL después de varios intentos.');  // Muestra un mensaje de error.
        process.exit(1);  // Termina el proceso con un código de error.
    }

    // Crear tabla si no existe
    await conn.query(`CREATE TABLE IF NOT EXISTS personas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        edad INT NOT NULL,
        ciudad VARCHAR(255) NOT NULL
    )`);

    // Define una ruta para el endpoint raíz ("/").
    app.get("/", async (req, res) => {
        try {
            const [rows] = await conn.query("SELECT * FROM personas");  // Consulta todas las filas de la tabla `personas`.
            res.json(rows);  // Envía los resultados de la consulta como respuesta en formato JSON.
        } catch (error) {
            res.status(500).send("Error al consultar la base de datos.");  // Si hay un error, responde con un estado 500.
            console.error(error);  // Muestra el error en la consola.
        }
    });

    // Define una ruta para agregar una nueva persona.
    app.get("/agregar", async (req, res) => {
        try {
            const { nombre, edad, ciudad } = req.query;  // Obtiene los parámetros `nombre`, `edad`, y `ciudad` de la consulta.
            await conn.query("INSERT INTO personas (nombre, edad, ciudad) VALUES (?, ?, ?)", [nombre, edad, ciudad]);  // Inserta una nueva fila en la tabla `personas`.
            res.send("Persona agregada");  // Responde con un mensaje de confirmación.
        } catch (error) {
            res.status(500).send("Error al agregar persona.");  // Si hay un error, responde con un estado 500.
            console.error(error);  // Muestra el error en la consola.
        }
    });

    // Define una ruta para actualizar una persona existente.
    app.get("/actualizar", async (req, res) => {
        try {
            const { id, nombre, edad, ciudad } = req.query;  // Obtiene los parámetros `id`, `nombre`, `edad`, y `ciudad` de la consulta.
            await conn.query("UPDATE personas SET nombre = ?, edad = ?, ciudad = ? WHERE id = ?", [nombre, edad, ciudad, id]);  // Actualiza la fila correspondiente en la tabla `personas`.
            res.send("Persona actualizada");  // Responde con un mensaje de confirmación.
        } catch (error) {
            res.status(500).send("Error al actualizar persona.");  // Si hay un error, responde con un estado 500.
            console.error(error);  // Muestra el error en la consola.
        }
    });

    // Define una ruta para borrar una persona existente.
    app.get("/borrar", async (req, res) => {
        try {
            const { id } = req.query;  // Obtiene el parámetro `id` de la consulta.
            await conn.query("DELETE FROM personas WHERE id = ?", [id]);  // Borra la fila correspondiente en la tabla `personas`.
            res.send("Persona borrada");  // Responde con un mensaje de confirmación.
        } catch (error) {
            res.status(500).send("Error al borrar persona.");  // Si hay un error, responde con un estado 500.
            console.error(error);  // Muestra el error en la consola.
        }
    });

    // Inicia el servidor y lo pone a escuchar en el puerto especificado.
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);  // Muestra un mensaje indicando que el servidor está corriendo.
    });
}

iniciarServer();  // Llama a la función para iniciar el servidor.
