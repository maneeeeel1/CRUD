const express = require ("express");
const app = express();

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/usuarios", (req, res) =>{
    res.json(usuarios);
});

app.get("/usuarios/:nombre", (req, res) =>{
    const nombre = req.params.nombre;
    const usuario = usuarios.find(user => user.nombre.toLowerCase() === nombre.toLowerCase());
    if(usuario){
        res.json(usuario);
    }else{
        res.status(404).json({mensaje: "User no encontrado"});
    }
});

app.post("/usuarios", (req, res) =>{
    const nuevoUsuario = req.body;
    nuevoUsuario.id = usuarios.length +1;
    usuarios.push(nuevoUsuario);
    res.status(201).json({mesanej: "User creado", usuario: nuevoUsuario});
});

app.put("/usuarios/:nombre", (req, res) =>{
    const nombre = req.params.nombre;
    const index = usuarios.findIndex(user => user.nombre.toLowerCase()=== nombre.toLowerCase());
    if(index !== -1){
        usuarios[index] = {...usuarios[index], ...req.body};
        res.json({mensaje: "Usuario actualizado", usuario: usuarios[index]});
    } else {
        res.status(404).json({mensaje: "Usuario no encontrado"});
    }
});

app.delete("/usuarios/:nombre", (req, res) =>{
    const nombre = req.params.nombre;
    const usuario = usuarios.find(user => user.nombre.toLowerCase() === nombre.toLowerCase());
    if(usuario){
        usuarios =usuarios.filter(user=> user.nombre.toLowerCase() !== nombre.toLowerCase());
        res.json({mensaje:"Usuario eliminado", usuario});
    }else{
        res.status(404).json({mensaje:"Usuario no encontrado"});
    }
});


app.listen(3000, () =>{
    console.log("server listening port 3000");
});