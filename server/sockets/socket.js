const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();


io.on('connection', (client) => {


    client.on('entrarChat', (data, callback) => {

        if (data.nombre === "" || data.sala === "") {
            return callback({
                err: true,
                mensaje: 'El nombre y la sala son necesarios'
            });
        }

        client.join(data.sala);

        let personas = usuarios.agregarPersona(client.id, data.nombre, data.sala);

        callback(usuarios.getPersonasPorSalas(data.sala));

        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSalas(data.sala));

    });

    client.on('mensajePrivado', (data) => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });

    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(persona.sala).emit('crearMensaje', crearMensaje(persona.nombre, data.mensaje));

    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id);

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${ personaBorrada.nombre } salió`));

        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSalas(personaBorrada.sala));
    });
});