let socket = io();

let params = new URLSearchParams(window.location.search);

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
        console.log('Usuarios conectados: ', resp);
    });
});

// Escuchar información
socket.on('crearMensaje', (mensaje) => {
    console.log(mensaje);
});


// Escuchar cambios de usuarios cuando 
// salen o entran al chat
socket.on('listaPersonas', (mensaje) => {
    console.log(mensaje);
});

// Enviar un mensaje privado
socket.on('mensajePrivado', (mensaje) => {
    console.log(mensaje);
});