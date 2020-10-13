let socket = io();


if (params.get('nombre') === "" || params.get('sala') === "") {
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

let usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', () => {
    // Enviar nombre de usuario
    socket.emit('entrarChat', usuario, (resp) => {
        // console.log('Usuarios conectados: ', resp);
        renderizarUsuarios(resp);
    });
});

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    renderizarMensajes(mensaje, false);
    scrollBottom();
});

// Escuchar cambios de usuarios cuando 
// salen o entran al chat
socket.on('listaPersonas', (personas) => {
    // console.log(mensaje);
    renderizarUsuarios(personas);
});

// Enviar un mensaje privado
socket.on('mensajePrivado', (mensaje) => {
    console.log(mensaje);
});