const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8001;

// Configuración de la conexión a la base de datos MySQL
const myConnection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'club_lectura'
    }

);

myConnection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());



// Ruta para obtener todas las tareas
app.get('/libros', (req, res) => {
  const sql = 'SELECT * FROM libro';

  myConnection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    res.json(results);
  });
});


app.get('/libros/:id', (req, res) => {
  const id= req.params.id;

  myConnection.query("select * from libro where id = ?",[id], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }

    res.json(results);
  });
});


app.delete('/libros/:id', (req, res) => {
  const id= req.params.id;

  myConnection.query("delete from libro where id = ?",[id], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json({ success: true });
  });
});

app.post('/libros', (req, res) => {
    const titulo = req.body.titulo;
    const autor = req.body.autor;
    const descripcion = req.body.descripcion;
    const fecha_publicacion = req.body.fecha_publicacion;
    const id_genero = req.body.id_genero;

  const sql = 'INSERT INTO libro (titulo,autor,descripcion,fecha_publicacion,id_genero) VALUES (?,?,?,?,?)';

  myConnection.query(sql, [titulo,autor,descripcion,fecha_publicacion,id_genero], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    res.json({ success: true, message: 'Registro insertado correctamente' });
  });
});


app.put('/libros/:id', (req, res) => {
  const titulo = req.body.titulo;
  const autor = req.body.autor;
  const descripcion = req.body.descripcion;
  const fecha_publicacion = req.body.fecha_publicacion;
  const id_genero = req.body.id_genero;
  const id= req.params.id;

  const sql = 'UPDATE libro SET titulo = ?, autor = ?, descripcion=?, fecha_publicacion = ?, id_genero = ? WHERE id = ?';

  myConnection.query(sql, [titulo,autor,descripcion,fecha_publicacion,id_genero,id], (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }

    res.json({ success: true, message: 'Registro actualizado correctamente' });
  });
});


app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
}); 