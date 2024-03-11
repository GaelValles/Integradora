// Importa las bibliotecas necesarias
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Para el cifrado de contraseñas
const jwt = require('jsonwebtoken'); // Para la generación de tokens JWT

// Crea una instancia de Express
const app = express();

// Middleware para analizar los cuerpos de las solicitudes JSON
app.use(bodyParser.json());

// Array simulado de usuarios (para propósitos de demostración)
const users = [
    {
        id: 1,
        username: 'usuario1',
        // Contraseña cifrada utilizando bcrypt (123456)
        password: '$2b$10$yf.V0XNT77KVkYZB/G.jHuC8zV6InBBFgmVWdZflVQStx1gCld7Qa'
    }
];

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    // Extraer nombre de usuario y contraseña del cuerpo de la solicitud
    const { username, password } = req.body;

    // Buscar el usuario en la base de datos por nombre de usuario
    const user = users.find(user => user.username === username);

    // Verificar si el usuario existe
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar la contraseña usando bcrypt
    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id }, 'mi_secreto_secreto', { expiresIn: '1h' }); // 'mi_secreto_secreto' debería ser una cadena secreta más segura en un entorno real

    // Enviar el token como respuesta
    res.json({ token });
});

// Middleware para verificar el token en cada solicitud
function authenticateToken(req, res, next) {
    // Extraer el token de la cabecera de autorización
    const token = req.headers['authorization'];

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    // Verificar y decodificar el token
    jwt.verify(token, 'mi_secreto_secreto', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        // Agregar el ID de usuario decodificado a la solicitud para su posterior uso
        req.userId = decoded.userId;
        // Continuar con la siguiente función de middleware
        next();
    });
}

// Ruta protegida de ejemplo
app.get('/recurso-protegido', authenticateToken, (req, res) => {
    // Aquí puedes realizar acciones para la ruta protegida, por ejemplo:
    res.json({ message: 'Bienvenido al recurso protegido' });
});

// Exportar la aplicación de Express
module.exports = app;
