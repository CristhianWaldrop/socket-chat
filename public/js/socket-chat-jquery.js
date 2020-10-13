let params = new URLSearchParams(window.location.search);

// referencias de jQuery
let divUsuarios = $('#divUsuarios');
let divChatbox = $('#divChatbox');
let formEnviar = $('#formEnviar');
let txtMensaje = $('#txtMensaje');



function renderizarUsuarios(personas) {

    let html = '';

    html += '<li>';
    html += '   <a href="javascript:void(0)" class="active"> Chat de <span>' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0, img = 1; i < personas.length; i++, img++) {
        html += '<li>';
        html += '   <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/' + img + '.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html);
}

function renderizarMensajes(mensaje, yo) {

    let html = '';
    let fecha = new Date(mensaje.fecha);
    let hora = fecha.getHours() + ':' + fecha.getMinutes();

    let classAdmin = 'info';
    if (mensaje.nombre === 'Admin') {
        classAdmin = 'danger';
    }

    if (yo) {

        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';
        if (mensaje.nombre !== 'Admin') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '        <div class="chat-content">';
        html += '            <h5>' + mensaje.nombre + '</h5>';
        html += '            <div class="box bg-light-' + classAdmin + '">' + mensaje.mensaje + '</div>';
        html += '        </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    let newMessage = divChatbox.children('li:last-child');

    // heights
    let clientHeight = divChatbox.prop('clientHeight');
    let scrollTop = divChatbox.prop('scrollTop');
    let scrollHeight = divChatbox.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// listeners
divUsuarios.on('click', 'a', function() {

    let id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e) {

    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        nombre: params.nombre,
        mensaje: txtMensaje.val()
    }, (mensaje) => {
        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

});